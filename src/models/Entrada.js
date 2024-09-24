import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

import moment from "moment";

const entradaSchema = new mongoose.Schema(
    {
        code: { type: String},
        product: { type: String },
        quantity: { type: Number },
        creado: { type: String }
    },
    {
        timestamps: {
            createdAt: false,
            updatedAt: false
        },
        versionKey: false,
    }
);

entradaSchema.plugin(mongoosePaginate);

export default mongoose.model('entrada', entradaSchema);