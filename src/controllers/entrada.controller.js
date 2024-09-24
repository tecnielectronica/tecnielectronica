import Entrada from "../models/Entrada";
import Inventario from "../models/Inventario";

export const createEntrada = async (req, res) => {
  const { code, product, quantity, creado } = req.body;

  try {
    const foundInventary = await Inventario.findOne({
      code: { $regex: code, $options: "i" },
    });

    const newEntrada = new Entrada({
      code,
      product,
      quantity,
      creado,
    });


    if (foundInventary) {
      const inventary = {
        code: foundInventary.code,
        product: foundInventary.product,
        stock: Number(foundInventary.stock) + Number(quantity),
        precio: foundInventary.precio,
      };

      const updateFoundEntrada = await Inventario.updateOne(
        { _id: foundInventary._id },
        { $set: inventary }
      );

      const entradaSaved = await newEntrada.save();
      res.status(201).json(entradaSaved);
    } else {
      res
        .status(404)
        .json("El producto no se encontro porfavor verifique el inventario");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateEntradaById = async (req, res) => {
  try {
    let updatebody = {}
    
    const entrada = await Entrada.findOne({
      _id: req.params.entradaId
    });

    
    if (req.body.quantity != entrada.quantity) {
      const foundInventary = await Inventario.findOne({ code: req.body.code });

      const inventary = {
        code: foundInventary.code,
        product: foundInventary.product,
        entrada: foundInventary.entrada,
        salida: foundInventary.salida,
        stock: req.body.quantity,
        precio: foundInventary.precio,
      };
      
      const updateFoundEntrada = await Inventario.updateOne(
        { _id: foundInventary._id },
        { $set: inventary }
        );
      }

      updatebody = {
        code: req.body.code,
        product: req.body.product,
        quantity: req.body.quantity,
        creado: req.body.creado
      }

      const updateEntrada = await Entrada.findByIdAndUpdate(
        req.params.entradaId,
        req.body,
      );

    res.status(200).json(updateEntrada);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteEntradaById = async (req, res) => {
  try {
    const { entradaId } = req.params;

    const validacion = await Entrada.findById(entradaId);
    if (!validacion) {
      res.json("No se ha encontrado el producto a eliminar");
    } else {
      const findInventary = await Inventario.findOne({
        code: { $regex: validacion.code, $options: "i" },
      });

      const inventary = {
        code: findInventary.code,
        product: findInventary.product,
        stock: findInventary.stock - validacion.quantity,
        precio: findInventary.precio,
        fecha: findInventary.fecha,
        salida: findInventary.salida,
      };

      const updateFoundInventary = await Inventario.updateOne(
        { _id: findInventary._id },
        { $set: inventary }
      );

      const response = await Entrada.findByIdAndDelete(entradaId);
      return res.status(200).json("Entrada borrada correctamente!");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getEntradas = async (req, res) => {
  try {
    const entradas = await Entrada.find();

    res.status(200).json(entradas);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getEntradaPaginations = async (req, res) => {
  try {
    const queryLimit = Number(req.query.limit) || 20,
      querySkip = Number(req.query.skip) || 0;

    const entradas = await Entrada.find().skip(querySkip).limit(queryLimit);

    let count = await Entrada.count();

    return res.status(200).json({
      content: entradas,
      total: count,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getSearchConsultaInventario = async (req, res) => {
  try {
    const queryLimit = Number(req.query.limit) || 10,
      querySkip = Number(req.query.skip) || 0;
    const { searchInventario } = req.params;

    const entradaSearch = await Inventario.find({
      $or: [
        { code: { $regex: ".*" + searchInventario + ".*", $options: "i" } },
        { product: { $regex: ".*" + searchInventario + ".*", $options: "i" } },
        { creado: { $regex: searchInventario, $options: "i" } },
      ],
    })
      .skip(querySkip)
      .limit(queryLimit);

    const entradaCount = await Inventario.find({
      $or: [
        { code: { $regex: ".*" + searchInventario + ".*", $options: "i" } },
        { product: { $regex: ".*" + searchInventario + ".*", $options: "i" } },
        { creado: { $regex: searchInventario, $options: "i" } },
      ],
    });

    let count = entradaCount.length;

    return res.status(200).json({
      content: entradaSearch,
      total: count,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getSearchEntrada = async (req, res) => {
  try {
    const queryLimit = Number(req.query.limit) || 10,
      querySkip = Number(req.query.skip) || 0;
    const { search } = req.params;

    const entradaSearch = await Entrada.find({
      $or: [
        { code: { $regex: ".*" + search + ".*", $options: "i" } },
        { product: { $regex: ".*" + search + ".*", $options: "i" } },
        { creado: { $regex: search, $options: "i" } },
      ],
    })
      .skip(querySkip)
      .limit(queryLimit);

    const entradaCount = await Entrada.find({
      $or: [
        { code: { $regex: ".*" + search + ".*", $options: "i" } },
        { product: { $regex: ".*" + search + ".*", $options: "i" } },
        { creado: { $regex: search, $options: "i" } },
      ],
    });

    let count = entradaCount.length;

    return res.status(200).json({
      content: entradaSearch,
      total: count,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
