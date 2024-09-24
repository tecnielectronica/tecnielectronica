import jwt from "jsonwebtoken";
import { SECRET } from "../config";
import User from "../models/User";
import Role from "../models/Rol";

export const verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) { return res.status(403).json({ message: "No token provided" }) };

    try {
        const decoded = jwt.verify(token, SECRET);
        req.userId = decoded.id;

        const user = await User.findById(req.userId, { password: 0 });
        if (!user) { return res.status(404).json({ message: "No user found" }) };

        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized!" })
    }
}

export const isModerator = async (req, res, next) => {
    try {
        let token = req.headers["x-access-token"];
        const decoded = jwt.verify(token, SECRET);
        req.userId = decoded.id;
        
        const user = await User.findById(req.userId);
        const roles = await Role.find({ _id: { $in: user.roles } });
        for (let i=0; i < roles.length; i++) {
            if (roles[i].name === 'moderador' || roles[i].name === 'admin') {
                next();
                return;
            }
        }
        res.status(403).json({ message: "Requiere el rol moderador!" })
    } catch (error) {
        res.status(500).send({ message: error.message });        
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        let token = req.headers["x-access-token"];
        const decoded = jwt.verify(token, SECRET);
        req.userId = decoded.id;

        const user = await User.findById(req.userId);
        const roles = await Role.find({ _id: { $in: user.roles } });
        for (let i=0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
                next();
                return;
            }
        }
        res.status(403).json({ message: "Requiere el rol administrador!" })
    } catch (error) {
        res.status(500).send({ message: error });
    }
}