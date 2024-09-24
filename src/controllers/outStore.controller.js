import Inventario from "../models/Inventario";
import OutStore from "../models/OutStore";

export const getOutStorePaginations = async (req, res) => {
    try {

        let count = await OutStore.count();
        const queryLimit = Number(req.query.limit) || 10,
        querySkip = Number(req.query.skip) || 0;
        
        const outStorefounded = await OutStore.find()
            .skip(querySkip)
            .limit(queryLimit);

        return res.status(200).json({
            content: outStorefounded,
            total: count,
        });
    } catch (error) {
        return res.status(500).send(error);
    }
}

export const getSearchOutStore = async (req, res) => {
    try {
        const queryLimit = Number(req.query.limit) || 10,
            querySkip = Number(req.query.skip) || 0;
        const { search } = req.params;

        const outStoreSearch = await outStore.find({
            $or: [
                { code: { $regex: ".*" + search + ".*", $options: "i" } },
                { product: { $regex: ".*" + search + ".*", $options: "i" } },
                { creado: { $regex: ".*" + search + ".*", $options: "i" } },
                { actualizado: { $regex: ".*" + search + ".*", $options: "i" } },
            ],
        })
        .skip(querySkip)
        .limit(queryLimit);

        const outStoreCount = await OutStore.find({
            $or: [
                { code: { $regex: ".*" + search + ".*", $options: "i" } },
                { product: { $regex: ".*" + search + ".*", $options: "i" } },
                { creado: { $regex: ".*" + search + ".*", $options: "i" } },
                { actualizado: { $regex: ".*" + search + ".*", $options: "i" } },
            ],
        });

        let count = outStoreCount.length;

        return res.status(200).json({
            content: outStoreSearch,
            total: count
        });
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const createOutStore = async (req, res) => {
    const { code, product, quantity, creado, actualizado } = req.body;

    try {
        const outStore = new OutStore({
            code,
            product,
            quantity, 
            creado,
            actualizado,
        });
        
        const findProduct = await Inventario.findOne({
            code: { $regex: code, $options: "i" }
        });
        
        if (findProduct) {

            const outStoreSaved = await outStore.save();
            res.status(201).json(outStoreSaved);
        } else {
            res.status(404)
            .json("El producto no se encontro porfavor verifique el inventario")
        }

    } catch (error) {
        return res.status(500).json(error);
    }
}

export const updateOutStore = async (req, res) => {
    try {
        const inventary = await Inventario.findOne({ code: req.body.code });
        
        if (req.quantity > inventary.stock) {
            return res.status(500).json("No se permite realizar cantidades mayores a las que hay en el inventario")
        } else if (req.quantity <= inventary.stock) {
            const updateOutStore = await OutStore.updateOne(
                { _id: req._id },
                { $set: req.body }
            )

            return res.status(200).json(updateOutStore);
        } 
        
    } catch (error) {
        return res.status(500).send(error);
    }
}

export const deleteOutStore = async (req, res) => {
    try {
        const { outStoreId } = req.params;

        const validacion = await OutStore.findById(outStoreId);
        if (!validacion) {
            res.json("No se ha encontrado el producto a eliminar");
        } else {
            await OutStore.findByIdAndDelete(outStoreId);

            res.status(200).json('El registro fue eliminado mas correctamente!')
        }
    } catch (error) {
        res.status(500).send(error);
    }
}