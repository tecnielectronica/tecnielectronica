import mongoose from "mongoose";

export const ROLES = [ "admin", "moderador" ];

const rolSchema = new mongoose.Schema(
    {
        name: String,
    },
    {
        versionKey: false
    }
);

export default mongoose.model("Rol", rolSchema);