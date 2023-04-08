import { Router } from "express";

import auth from '../middleware/auth.js';
import { getBannedPostings, getReportedPostings, getUsers, updateBanPosting, updateReleasePosting } from "./admin.controller.js";

const router = Router();

router.get('/api/admin/users', auth, getUsers);

router.get('/api/admin/reportedposting', auth, getReportedPostings);

router.get('/api/admin/bannedposting', auth, getBannedPostings);

router.put('/api/admin/releaseposting/:id', auth, updateReleasePosting);

router.put('/api/admin/banposting/:id', auth, updateBanPosting);

export default router;