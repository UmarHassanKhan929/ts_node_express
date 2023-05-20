import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"

dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev",
})

const app: Express = express()

app.get("/", (req: Request, res: Response) => {
  res.send("Hello !" + process.env.HELLO_WORLD)
})

app.get("/name", (req: Request, res: Response) => {
  res.send("My name is John Doe")
})

app.listen(3000, () => {
  console.log("Server is listening on port 3000")
})
