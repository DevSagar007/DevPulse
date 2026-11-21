import { Pool } from "pg"

const pool = new Pool({
    connectionString: "postgresql://neondb_owner:npg_NVOj70EBLbUY@ep-noisy-smoke-bdo4z66b-pooler.c-8.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
})

// connect DB async function
const initDB = async () => {
    try {
    const result = await pool.query("SELECT NOW");
    console.log("Database connected successfully");
    console.log("Database time:", result.rows[0].now);

    } catch (error) {
        console.log("Database connection failed", error);
        process.exit(1);
    }
}
export {pool, initDB}