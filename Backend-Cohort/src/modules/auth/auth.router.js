import { Router } from "express";
import RegisterDto from "./dto/register.dto.js";
import LoginDto from "./dto/login.dto.js";
import * as controller from './auth.controller.js'
import validate from '../../common/middleware/validate.middleware.js';
import {authenticate,} from './auth.middleware.js';

const router = Router();

router.get('/health-check', controller.healthCheck);

router.post("/register", validate(RegisterDto), controller.register)

router.post("/login", validate(LoginDto), controller.login);

router.post("logout", authenticate, controller.logout);

router.get('/me', authenticate, controller.getMe);

router.get("/verify-email/:token", controller.verifyEmail);


export default router;