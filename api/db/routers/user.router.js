import { Router } from "express";
import { updateUser,deleteUser,getUserListing,getUser } from "../controllers/user.controller.js";
import { verifyUser } from "../../security/verifyUser.js";
const router = Router();
router.put('/user/update/:id' ,verifyUser,updateUser);
router.delete('/user/delete/:id' ,verifyUser,deleteUser);
router.get('/user/showlisting/:id' ,verifyUser,getUserListing);
router.get('/:id' ,verifyUser,getUser);


export default router;