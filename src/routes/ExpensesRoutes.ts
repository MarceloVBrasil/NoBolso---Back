import { ExpensesController } from "../controllers/ExpensesController";
import { AutenticacaoMiddleware } from "../middlewares/AuthenticationMiddleware";
import { AutorizacaoMiddleware } from "../middlewares/AuthorizationMiddleware";
import { router } from "./router";

const expensesRoutes = router
const expensesController = new ExpensesController()

expensesRoutes.route("/expenses")
    .post(AutenticacaoMiddleware, AutorizacaoMiddleware('expenses', ['getAll', 'getById', 'add', 'update', 'delete']), expensesController.add)

expensesRoutes.route("/expenses/month/grouped")
    .get(AutenticacaoMiddleware, AutorizacaoMiddleware('expenses', ['getAll', 'getById', 'add', 'update', 'delete']), expensesController.getByMonthGroupedByCategory)

expensesRoutes.route("/expenses/month/individually")
    .get(AutenticacaoMiddleware, AutorizacaoMiddleware('expenses', ['getAll', 'getById', 'add', 'update', 'delete']), expensesController.getByMonthIndividually)

expensesRoutes.route("/expenses/total")
    .get(AutenticacaoMiddleware, AutorizacaoMiddleware('expenses', ['getAll', 'getById', 'add', 'update', 'delete']), expensesController.getTotalGroupedByDate)

expensesRoutes.route("/expenses/:id")
    .delete(AutenticacaoMiddleware, AutorizacaoMiddleware('expenses', ['getAll', 'getById', 'add', 'update', 'delete']), expensesController.delete)
    .put(AutenticacaoMiddleware, AutorizacaoMiddleware('expenses', ['getAll', 'getById', 'add', 'update', 'delete']), expensesController.update)

export { expensesRoutes }