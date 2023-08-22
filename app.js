import express from "express"
import db from "./config/Database.js"
import dotenv from "dotenv"
import router from "./routes/index.js"


dotenv.config()
const app = express()

try {
  await db.authenticate()
  console.log("Database connected...")
} catch (error) {
  console.log(error)
}
app.use(express.json())
app.use(router)



app.listen(3000, ()=> console.log("Server running at port 3000"))