import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const register = async (req, res) => {
    try {
        const {email, password, username} = req.body;

        if (!email || !password || !username){
            return res.status(400).send("Missing Parameters")
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashPassword,
                username,
            }
        });

        const token = jwt.sign({ email }, process.env.SECRET_KEY, {
			expiresIn: process.env.JWT_EXPIRE,
		});

        return res.cookie("token", token).json({
			success: true,
			message: "User successfully registered",
			data: user,
			token,
		});

    } catch (error) {
        res.status(500).send(error);
    }
};


export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        console.log(req.body);

        if(!email || !password){
            return res.status(400).send("Missing Parameter X");
        };

        // check apakah user ada dalam db
        const user = await prisma.user.findUnique({where: {email}});
        if(!user){
            return res.status(404).send("Akun Tidak Ditemukan!");
        };

        // cek password
        const isMatched= await bcrypt.compare(password, user.password);
        if(!isMatched) {
            return res.status(401).send("Password Salah!")
        };

        const token = jwt.sign({email}, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        });

        console.log(token);
        return res
        .cookie("token", token)
        .json({
            success: true,
            message: "Login Successfully"
        });

    } catch (error) {
        
    }
};

export const logout = async (req, res) => {
    res.clearCookie('token');
    return res.json({
        success: true,
        message: "Logged Out"
    });
};
