import { Router } from "express";
import { Login, Logout, Profile, Register } from './auth.controller.js';

const router = Router();

router.post('/register', Register);
router.post('/login', Login);
router.get('/profile', Profile);
router.post('/logout', Logout);


export default router;