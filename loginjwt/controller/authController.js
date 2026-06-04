import express, { Router } from 'express';
import bodyParser from 'body-parser';
import { JsonWebToken } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';
import User from '../models/userSchema';

const router = Router();

router.use(bodyParser({ extended: true }));
router.use(bodyParser.json());

export { router };
