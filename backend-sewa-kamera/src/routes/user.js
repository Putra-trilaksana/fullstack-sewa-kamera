import { Router } from 'express';
import * as UserController from '../controller/UserController.js';
import isAuthenticated from '../middleware/auth.js';

export const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/logout", isAuthenticated, UserController.logout);

