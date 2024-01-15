import { router } from "./router"
import { AuthController } from "../controllers/AuthController"

const authController = new AuthController()

const authRoutes = router

authRoutes.route("/login")
    .post(authController.login)

authRoutes.route("/cadastrar")
    .post(authController.cadastrar)

export { authRoutes }