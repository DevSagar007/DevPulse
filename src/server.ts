import dotenv from "dotenv";
import app from "./app";
import { initDB } from "./db";

dotenv.config();

const PORT = process.env.PORT || 5000;

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`)
    })
})