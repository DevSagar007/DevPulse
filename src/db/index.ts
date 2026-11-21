import { Pool } from "pg"
import config from "../config"

if (!config.connect_string) {
    throw new Error("CONNECTIONSTRING is missing in .env")
}

const pool = new Pool({
    connectionString: config.connect_string
})

// connect DB async function
const initDB = async () => {
    try {
        const result = await pool.query("SELECT NOW()")
        console.log("Database connected successfully")
        console.log("Database time:", result.rows[0].now)

    } catch (error) {
        console.log("Database connection failed", error)
        process.exit(1)
    }
}
export {pool, initDB}