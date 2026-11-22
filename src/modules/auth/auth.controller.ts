import type { Request, Response } from "express";

const updateUser = async (req: Request, res:Response) => {
    const {id} = req.params;
    try {
        const result = await authService.signUpDb(req.body, id as string)

        //check id user exists
        if(result.rows.length === 0) {
            result.status(404).json({
                success: false,
                message:"User not found!",
            })
        }

        // user update successfully
        res.status(200).json({
            success: true,
            message:"User Updated successfully"
        })

        
    }catch(error:any) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error,
        })
    }
}