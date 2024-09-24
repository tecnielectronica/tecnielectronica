import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const outStoreSchema = new mongoose.Schema(
    {
        code: { type: String},
        product: { type: String},
        quantity: { type: Number },
        creado: { type: String },
        actualizado: { type: String }
    },
    {
        timestamps: {
            updatedAt: true
        },
        versionKey: false
    }
);

outStoreSchema.plugin(mongoosePaginate);

export default mongoose.model('outStore', outStoreSchema);