import { RevenueController } from "../controllers/RevenueController";
import { AutenticacaoMiddleware } from "../middlewares/AuthenticationMiddleware";
import { AutorizacaoMiddleware } from "../middlewares/AuthorizationMiddleware";
import { router } from "./router";

const revenueRoutes = router
const revenueController = new RevenueController()

revenueRoutes.route("/revenue")
    .post(AutenticacaoMiddleware, AutorizacaoMiddleware('revenue', ['getAll', 'getById', 'add', 'update', 'delete']), revenueController.add)

revenueRoutes.route("/revenue/month/grouped")
    .get(AutenticacaoMiddleware, AutorizacaoMiddleware('revenue', ['getAll', 'getById', 'add', 'update', 'delete']), revenueController.getByMonthGroupedByCategory)

revenueRoutes.route("/revenue/month/individually")
    .get(AutenticacaoMiddleware, AutorizacaoMiddleware('revenue', ['getAll', 'getById', 'add', 'update', 'delete']), revenueController.getByMonthIndividually)

revenueRoutes.route("/revenue/total")
    .get(AutenticacaoMiddleware, AutorizacaoMiddleware('revenue', ['getAll', 'getById', 'add', 'update', 'delete']), revenueController.getTotalGroupedByDate)

revenueRoutes.route("/revenue/:id")
    .delete(AutenticacaoMiddleware, AutorizacaoMiddleware('revenue', ['getAll', 'getById', 'add', 'update', 'delete']), revenueController.delete)
    .put(AutenticacaoMiddleware, AutorizacaoMiddleware('revenue', ['getAll', 'getById', 'add', 'update', 'delete']), revenueController.update)

export { revenueRoutes }