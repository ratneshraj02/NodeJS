import { Router } from 'express';
import {
    changeCurrentPassword,
    getCurrentUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
    updateAccountDetails,
} from '../controller/user.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

//secure route
router.route('/logout').post(verifyJWT, logoutUser);
router.route('/refresh-token').post(refreshAccessToken);
router.route('/change-password').post(changeCurrentPassword);
router.route('/update-account').post(verifyJWT, updateAccountDetails);
router.route('/me').get(verifyJWT, getCurrentUser);
export default router;
