import User from "../models/User";
import { ROLES } from "../models/Rol";

export const checkExistingUsername = async (req, res, next) => {
    try {
        const foundUsername = await User.findOne({ username: req.body.username });
        if (userFound) 
            return res.status(400).json({ message: "El usuario ya existe!" });

        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const checkExistingRole = async (req, res, next) => {
    req.body.roles.find();

    if (!req.body.roles) return res.status(400).json({ message: "No roles" });

    for (let i=0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
            return res.status(400).json({
                message: `Role ${req.body.roles[i]} no existe!`
            });
        }
    }

    next();
}