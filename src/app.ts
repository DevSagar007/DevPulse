import express, { type Request, type Response } from "express";
import cors from "cors";
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Check route
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "DevPuls Api is running!"
    })
})

app.post('/', async (req, res) => {
    console.log(req.body);
})

// Auth route 
app.use("/api/auth", authRouter)

export default app;

















