import { asyncError, errorHandler } from "../../../middlewares/error";
import { User } from "../../../models/user"
import bcrypt from 'bcrypt'
import { cookieManager } from "../../../utils/features";

const handler = asyncError(async (req, res) => {

    const method = req.method;

    if (method !== 'GET') {
        errorHandler(res, 400, "Method not allowed");
    }

    cookieManager(res, "", false);

    return res.status(200).json({
        success: true,
        message: `Logged out successfully`
    })
})

export default handler