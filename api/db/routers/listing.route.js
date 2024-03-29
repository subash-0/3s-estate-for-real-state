import { Router } from "express";
import { createListing,deleteListing,getListing,updateListing,searchListing } from "../controllers/listing.controller.js";
import {verifyUser} from '../../security/verifyUser.js';
const router = Router();
router.post('/listing/create',verifyUser,createListing);
router.delete('/listing/delete/:id',verifyUser,deleteListing);
router.put('/listing/update/:id',verifyUser,updateListing);
router.get('/listing/getListing/:id',getListing);
router.get('/listing/getall',searchListing);
export default router;