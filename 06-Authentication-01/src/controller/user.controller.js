import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { User } from '../models/user.model.js';
import { ApiResponse } from '../utils/apiResponse.js';
import jwt from 'jsonwebtoken';

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);

        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            400,
            error.message || 'Something went wrong while creating token',
        );
    }
};

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, dob, password } = req.body;

    if (fullName === '') {
        throw new ApiError(400, 'fullname is required');
    }

    if (!email) {
        throw new ApiError(400, 'email is required');
    }

    if (!dob) {
        throw new ApiError(400, 'Dob is required');
    }

    if (!password) {
        throw new ApiError(400, 'password is required');
    }

    const existUser = await User.findOne({
        $or: [{ email }],
    });

    if (existUser) {
        throw new ApiError(400, 'email with name already exist');
    }

    const user = await User.create({
        email,
        fullName,
        password,
        dob,
    });

    //remove password from user object
    const createdUser = await User.findById(user._id).select('-password -dob');

    if (!createdUser) {
        throw new ApiError(400, 'Something went wrong while creating user');
    }

    return res
        .status(201)
        .json(new ApiResponse(201, createdUser, 'User register successfully'));
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        throw new ApiError(400, 'email is required');
    }

    if (!password) {
        throw new ApiError(400, 'password is required');
    }

    const user = await User.findOne({ email });

    const isPasswordValid = user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(400, 'Invalid user credentials');
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        user._id,
    );

    const loggedInUser = await User.findById(user.id).select(
        '-password -refreshToken -dob',
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                'User logged in successfully',
            ),
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            refreshToken: null,
        },
        {
            returnDocument: 'after',
        },
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie('accessToken', options)
        .clearCookie('refreshToken', options)
        .json(new ApiResponse(200, {}, 'User logout'));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(400, 'Unauthorized request');
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET,
        );

        const user = await User.findById(decodedToken._id);
        if (!user) {
            throw new ApiError(401, 'Invalid refresh token');
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, 'Refresh token is expired');
        }

        const { accessToken, refreshToken } = generateAccessAndRefreshTokens(
            user.id,
        );

        const options = {
            httpOnly: true,
            secure: true,
        };

        return res
            .status(200)
            .cookie('accessToken', accessToken, options)
            .cookie('refreshToken', refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken,
                        refreshToken,
                    },
                    'Access Token Refreshed',
                ),
            );
    } catch (error) {
        throw new ApiError(400, error.message || 'Invalid refresh token');
    }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { email, dob, newPassword, confPassword } = req.body;

    if (!email) {
        throw new ApiError(400, 'email is required');
    }

    if (!dob) {
        throw new ApiError(400, 'dob is required');
    }

    if (!newPassword) {
        throw new ApiError(400, 'Password is required');
    }

    if (!(newPassword == confPassword)) {
        throw new ApiError(
            400,
            "Password and Confirm password doesn't matched",
        );
    }

    const user = await User.findOne({ email });

    const userDob = user.dob;
    if (!(userDob === dob)) {
        throw new ApiError(400, "dob doesn't matched");
    }

    user.password = confPassword;
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, 'Password change successfully'));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullName, dob } = req.body;
    console.log(req.user._id);
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                dob,
            },
        },
        {
            new: true,
        },
    ).select('-password');

    return res
        .status(200)
        .json(new ApiResponse(200, user, 'Account details updated'));
});

const getCurrentUser = asyncHandler(async (req, res) => {
    const user = req.user;

    return res
        .status(200)
        .json(user);
});

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    updateAccountDetails,
    getCurrentUser,
};
