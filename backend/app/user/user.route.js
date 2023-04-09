/*
Created By: Yun Ki Jung
Modified By: Yun Ki Jung, Apr/09/2023
*/

import { Router } from "express";
import { Auth, GetMyInfo, GetSavedList, Login, Logout, Register, SavePostingOnOff } from "./user.controller.js";
import auth from '../middleware/auth.js';

const router = Router();

router.post('/api/users/register', Register);
router.post('/api/users/login', Login);
router.get('/api/users/auth', auth, Auth);
router.get('/api/users/logout', auth, Logout);

router.get('/api/users/myinfo', auth, GetMyInfo);
router.put('/api/users/savepostingonoff', auth, SavePostingOnOff);
router.get('/api/users/savedlist', auth, GetSavedList)


export default router;