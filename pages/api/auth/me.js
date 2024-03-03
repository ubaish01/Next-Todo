import { asyncError, errorHandler } from "../../../middlewares/error"
import { checkAuth, connectDB } from "../../../utils/features";

const handler = asyncError(async (req, res) => {

    if (req.method !== 'GET') errorHandler(res, 500, "Method not allowed");

    connectDB();
    const user = await checkAuth(req);
    if (!user) errorHandler(res, 500, "Not Authenticated");

    const { password, ...userData } = user._doc;

    return res.status(200).json({
        success: true,
        user: userData
    })


});

export default handler