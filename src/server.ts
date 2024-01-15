import * as express from "express"
import * as cors from "cors"

import { variaveisAmbiente } from "./utils/EnvironmentVariables"
import { authRoutes } from "./routes/AuthRoutes"
import { categoryRoutes } from "./routes/CategoryRoutes"
import { expensesRoutes } from "./routes/ExpensesRoutes"
import { revenueRoutes } from "./routes/RevenueRoutes"

const { PORT, TEST_ENV } = variaveisAmbiente

const server = express()

// middlewares
server.use(cors())
server.use(express.json())

server.use("/auth", authRoutes)
server.use(categoryRoutes)
server.use(revenueRoutes)
server.use(expensesRoutes)

if (!TEST_ENV) {
    server.listen(PORT, () => console.log(`Server is running at port ${PORT}`))
}

export default server