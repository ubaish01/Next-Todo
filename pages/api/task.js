import { errorHandler } from "../../middlewares/error";
import { checkAuth, connectDB } from "../../utils/features";
import { Task } from "../../models/task"

const handler = async (req, res) => {
    try {

        const method = req.method;
        await connectDB();
        const user = await checkAuth(req);
        if (!user) errorHandler(res, 401, "Not authenticated");

        if (method === "POST") {
            const { title, description } = req.body;

            if (!title || !description) errorHandler(res, 500, "Missing title or description");

            await Task.create({
                user: user._id,
                title,
                description
            })

            return res.status(200).json({
                success: true,
                message: "Task created successfully"
            })


        }
        else if (method === "PUT") {
            const id = req.query.id;
            if (!id) errorHandler(res, 400, "TaskId not provided");

            const task = await Task.findById(id);

            if (!task) errorHandler(res, 404, "Task not found");

            task.isCompleted = !task.isCompleted;
            await task.save();

            return res.status(200).json({
                success: true,
                message: "Task updated successfully"
            });


        } else if (method === "DELETE") {
            const id = req.query.id;
            if (!id) errorHandler(res, 400, "TaskId not provided");

            await Task.findByIdAndDelete(id);

            return res.status(200).json({
                success: true,
                message: "Task removed successfully"
            });
        } else errorHandler(res, 400, "Method not allowed");



    } catch (error) {
        console.log(error);
    }


}

export default handler