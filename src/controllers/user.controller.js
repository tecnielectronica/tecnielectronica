import User from "../models/User";
import Rol from "../models/Rol";

export const createUser = async (req, res) => {
    try {
        const { username, password, roles } = req.body;
        
        const rolesFound = await Rol.find({ name: roles[0] });
        
        // creando un nuevo usuario
        const user = await User({
            username: username, 
            password: password, 
            roles: rolesFound.map((role) => role._id)
        });
        
        // encriptar la password
        user.password = await User.encryptPassword(user.password);

        // guardando el usuario
        const savedUser = await user.save();

        res.status(200).json({
            _id: user._id,
            username: savedUser.username,
            password: savedUser.password,
            roles: savedUser.roles
        })
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getUserByUsername = async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({ username });
    
    return res.json(user);
}

export const getUsers = async (req, res) => {
    const users = await User.find();
    return res.json(users);
}