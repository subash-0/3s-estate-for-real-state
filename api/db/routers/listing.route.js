import { Router } from "express";
import { createListing } from "../controllers/listing.controller.js";
import {verifyUser} from '../../security/verifyUser.js';
const router = Router();
router.post('/listing/create',verifyUser,createListing)
export default router;