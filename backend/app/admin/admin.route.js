/*
Created By: Yun Ki Jung
Modified By: Yun Ki Jung, Apr/09/2023
*/

import { Router } from "express";

import auth from '../middleware/auth.js';
import { getBannedPostings, getReportedPostings, getUsers, updateBanPosting, updateBanUser, updateReleasePosting } from "./admin.controller.js";

const router = Router();

router.get('/api/admin/users', auth, getUsers);

router.get('/api/admin/reportedposting', auth, getReportedPostings);

router.get('/api/admin/bannedposting', auth, getBannedPostings);

router.put('/api/admin/releaseposting/:id', auth, updateReleasePosting);

router.put('/api/admin/banposting/:id', auth, updateBanPosting);

router.put('/api/admin/banuser/:id', auth, updateBanUser)

export default router;