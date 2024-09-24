import Rol from "../models/Rol";

export const getAllRoles = async (req, res) => {

}

export const getRoleById = async (req, res) => {
    try {
        const { rolId } = req.params;

        const rolFound = await Rol.findById(rolId);
        return res.status(200).json(rolFound);
    } catch (error) {
        return res.status(500).send(error);
    }
}