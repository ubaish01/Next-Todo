import { asyncError, errorHandler } from "../../middlewares/error"
import { Task } from "../../models/task"
import { checkAuth, connectDB } from "../../utils/features";

const handler = asyncError(async(req, res) => {

    if(req.method !== 'GET')errorHandler(res,500,"Method not allowed");

    connectDB();
    const user = await checkAuth(req);
    if (!user) errorHandler(res, 500, "Not Authenticated");

    const todos = await Task.find({user:user._id});

    return res.status(200).json({
        success:true,
        todos
    })


});

export default handler