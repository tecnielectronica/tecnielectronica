import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

import moment from "moment";

const salidaSchema = new mongoose.Schema(
    {
        code: { type: String },
        product: { type: String },
        quantity: { type: Number },
        creado: { type: String },
    },
    {
        timestamps: {
            createdAt: false,
            updatedAt: false
        },
        versionKey: false
    }
);

salidaSchema.plugin(mongoosePaginate);

export default mongoose.model('salida', salidaSchema);