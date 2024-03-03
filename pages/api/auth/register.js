import { asyncError, errorHandler } from "../../../middlewares/error";
import { User } from "../../../models/user"
import bcrypt from 'bcrypt'
import { connectDB, cookieManager, generateToken } from "../../../utils/features";

const handler = asyncError(async (req, res) => {

    const method = req.method;

    if (method !== 'POST') {
        errorHandler(res, 400, "Method not allowed");
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) errorHandler(res, 400, "Data missing");


    await connectDB();

    let user = await User.findOne({ email });

    if (user) errorHandler(res, 400, "Email already registered");

    const salt = 10;
    const hashedPassword = bcrypt.hashSync(password, salt);

    user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    const token = generateToken(user._id);
    cookieManager(res, token, true);

    return res.status(200).json({
        success: true,
        message: `Welcome abourd Mr/Ms ${name}`
    })
})

export default handler