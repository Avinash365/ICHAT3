import  express  from "express";
import { login,singup,logout} from "../controllers/auth.controller.js";


const router = express.Router(); 

router.post("/login",login); 
router.post("/singup",singup); 
router.post("/logout",logout);


export default router;