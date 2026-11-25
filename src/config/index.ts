import dotenv from "dotenv"
import path from "path"

dotenv.config({
    path: path.join(process.cwd(), '.env')
})
const config = {
    connect_string: process.env.CONNECTIONSTRING as string,
    jwt_secret: process.env.JWT_SECRET as string,
    jwt_expires_in: process.env.JWT_EXPIRES_IN ?? "7d",
}

if (!config.connect_string) {
    throw new Error("CONNECTIONSTRING is missing in .env");
}

if (!config.jwt_secret) {
    throw new Error("JWT_SECRET is missing in .env");
}

export default config
