import router from "express.Router";
import authController from "../controllers/auth-controller.js";

// GET requests
router.get("/login", authController.getLogin);