import express from "express";
import dotenv from "dotenv";
dotenv.config({
    path: process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev",
});
const app = express();
app.get("/", (req, res) => {
    res.send("Hello !" + process.env.HELLO_WORLD);
});
app.get("/name", (req, res) => {
    res.send("My name is John Doe");
});
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
//# sourceMappingURL=index.js.map