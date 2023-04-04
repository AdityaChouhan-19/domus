import { Router } from "express";
import { Auth, Login, Logout, Register } from "./user.controller.js";
import auth from '../middleware/auth.js';

const router = Router();

router.post('/api/users/register', Register);
router.post('/api/users/login', Login);
router.get('/api/users/auth', auth, Auth);
router.get('/api/users/logout', auth, Logout);

export default router;