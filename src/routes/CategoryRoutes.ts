import { router } from "./router";

import { AutenticacaoMiddleware } from "../middlewares/AuthenticationMiddleware"
import { AutorizacaoMiddleware } from "../middlewares/AuthorizationMiddleware"
import { CategoryController } from "../controllers/CategoryController";

const categoryRoutes = router
const categoryController = new CategoryController()

categoryRoutes.route("/category")
    .get(AutenticacaoMiddleware, AutorizacaoMiddleware('category', ['getAll', 'getById', 'add', 'update', 'delete']), categoryController.getAll)
    .post(AutenticacaoMiddleware, AutorizacaoMiddleware('category', ['getAll', 'getById', 'add', 'update', 'delete']), categoryController.add)

categoryRoutes.route("/category/tipo")
    .get(AutenticacaoMiddleware, AutorizacaoMiddleware('category', ['getAll', 'getById', 'add', 'update', 'delete']), categoryController.getByTipo)

categoryRoutes.route("/category/:id")
    .put(AutenticacaoMiddleware, AutorizacaoMiddleware('category', ['getAll', 'getById', 'add', 'update', 'delete']), categoryController.update)
    .delete(AutenticacaoMiddleware, AutorizacaoMiddleware('category', ['getAll', 'getById', 'add', 'update', 'delete']), categoryController.delete)

export { categoryRoutes }