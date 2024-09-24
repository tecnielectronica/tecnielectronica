import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User";
import Rol from "../models/Rol";
import { SECRET } from "../config";

export const signup = async (req, res) => {
  try {
    const { username, password, roles } = req.body;

    // creando usuario
    const newUser = new User({
      username,
      password,
    });

    // revisando por roles
    if (roles) {
      const foundRoles = await User.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Rol.findOne({ name: "moderador" });
      newUser.roles = [role._id];
    }

    // guardar el objeto usuario en MongoDB
    const savedUser = await newUser.save();

    // creando el token
    const token = jwt.sign({ id: savedUser._id }, SECRET, {
      expiresIn: 86400,
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const signin = async (req, res) => {
  try {
    const userFound = await User.findOne({
      username: req.body.username,
    }).populate("roles");



    if (!userFound) return res.status(400).json({ message: "User Not Found" });

    // const isValid = await bcrypt.compare(
    //     req.body.password,
    //     userFound.password,
    // );

    // if (!isValid) {
    //   return res.status(401).json({
    //     token: null,
    //     message: "Invalid Password",
    //   });
    // }

    const token = jwt.sign({ id: userFound._id }, SECRET, {
      expiresIn: 99999999999999999999999999999,
    });

    return res.json({ 
      token, 
      username: req.body.username
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
