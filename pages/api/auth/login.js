import { asyncError, errorHandler } from "../../../middlewares/error";
import { User } from "../../../models/user"
import bcrypt from 'bcrypt'
import { connectDB, cookieManager, generateToken } from "../../../utils/features";

const handler = asyncError(async (req, res) => {

    const method = req.method;

    if (method !== 'POST') {
        errorHandler(res, 400, "Method not allowed");
    }

    const { email, password } = req.body;

    if (!email || !password) errorHandler(res, 400, "Data missing");


    await connectDB();

    let user = await User.findOne({ email });

    if (!user) errorHandler(res, 400, "User not found!");

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) errorHandler(res, 400, "Invalid email or password")

    const token = generateToken(user._id);
    cookieManager(res, token, true);

    return res.status(200).json({
        success: true,
        message: `Welcome back Mr/Ms ${user.name}`,
        user
    })
})

export default handler