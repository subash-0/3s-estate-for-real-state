import { Router } from "express";
import { createListing,deleteListing } from "../controllers/listing.controller.js";
import {verifyUser} from '../../security/verifyUser.js';
const router = Router();
router.post('/listing/create',verifyUser,createListing);
router.delete('/listing/delete/:id',verifyUser,deleteListing);
export default router;