import User from './auth.model.js';
import ApiError from '../../common/utils/api-error.js';
import { generateResetToken } from '../../common/utils/jwt.utils.js';


const register = async ({name, email, password, role}) => {
    const existing = await User.findOne({ email });

    if (existing) {
        throw ApiError.conflict("Email already exist");
    }

    const { rawToken, hashedToken } = generateResetToken;
    
    const user = User.create({
        name,
        email,
        password,
        role,
        verificationToken: hashedToken,
    })

    //TODO : Send an email to user with token : rowToken

    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.verificationToken;

    return userObj;
} 

export { register };