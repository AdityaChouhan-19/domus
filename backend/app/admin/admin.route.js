import { Router } from "express";

import auth from '../middleware/auth.js';
import { getUsers } from "./admin.controller.js";

const router = Router();

router.get('/api/admin/users', auth, getUsers);

export default router;