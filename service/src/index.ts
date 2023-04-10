import express from 'express'
import errorHandler from "./services/errorHandler";
import NoAuthRouter from './routes/NoAuthRouter'
import AuthRouter from './routes/AuthRouter'
import * as console from "console";
import AuthController from "./controller/AuthController";

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(errorHandler)

app.all('*', (_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'authorization, Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  next()
})


app.use('/api/auth', NoAuthRouter)
app.use('/api', AuthRouter)

app.listen(3002, () => globalThis.console.log('Server is running on port 3002'))
