import moment from "moment";

import Salida from "../models/Salida";
import Inventario from "../models/Inventario";

export const createSalida = async (req, res) => {
  const { code, product, quantity, creado } = req.body;

  try {
    const foundInventary = await Inventario.findOne({
      code: { $regex: code, $options: "i" },
    });

    const inventary = {
      code: foundInventary.code.toUpperCase(),
      product: foundInventary.product.toUpperCase(),
      stock: Number(foundInventary.stock) - Number(quantity),
      precio: foundInventary.precio,
      fecha: foundInventary.fecha,
      salida: foundInventary.salida,
    };

    const newSalida = new Salida({
      code,
      product,
      quantity,
      creado,
    });

    const updateFoundInventary = await Inventario.updateOne(
      { _id: foundInventary._id },
      { $set: inventary }
    );

    const salidaSaved = await newSalida.save();

    res.status(201).json(salidaSaved);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateSalidaById = async (req, res) => {
  try {
    const salida = await Salida.findOne({ _id: req.params.salidaId });

    const compareSalida = {
      _id: salida._id,
      code: salida.code,
      product: salida.product,
      quantity: salida.quantity,
      creado: salida.creado
    };

    const compareRequest = {
      _id: req.params.salidaId,
      code: req.body.code,
      product: req.body.product,
      quantity: req.body.quantity,
      creado: req.body.creado
    };

    if (JSON.stringify(compareSalida) != JSON.stringify(compareRequest)) {
      const foundInventary = await Inventario.findOne({
        code: { $regex: req.body.code, $options: "i" },
      });

      const cuadreSalida = foundInventary.stock + salida.quantity;

      const inventary = {
        code: foundInventary.code,
        product: foundInventary.product,
        stock: cuadreSalida - req.body.quantity,
        precio: foundInventary.precio,
        fecha: foundInventary.fecha,
        salida: foundInventary.salida,
      };

      const updateSalida = await Salida.findByIdAndUpdate(
        req.params.salidaId,
        req.body,
        {
          new: true,
        }
      );

      const updateFoundInventary = await Inventario.updateOne(
        { _id: foundInventary._id },
        { $set: inventary }
      );
      return res.status(200).json(updateSalida);
    } else {
      return res.status(500).json("Las salidas son iguales");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteSalidaById = async (req, res) => {
  try {
    const { salidaId } = req.params;

    const validacion = await Salida.findById(salidaId);

    if (!validacion) {
      return res.status(500).json("No se ha encontrado el producto a eliminar");
    } else {
      const findInventary = await Inventario.findOne({
        code: { $regex: validacion.code, $options: "i" },
      });

      const inventary = {
        code: findInventary.code,
        product: findInventary.product,
        stock: findInventary.stock + validacion.quantity,
        precio: findInventary.precio,
        fecha: findInventary.fecha,
        salida: findInventary.salida,
      };

      const updateFoundInventary = await Inventario.updateOne(
        { _id: findInventary._id },
        { $set: inventary }
      );

      const response = await Salida.findByIdAndRemove({ _id: salidaId });

      return res.status(200).json("Salida borrada correctamente");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getSalidas = async (req, res) => {
  try {
    const salidas = await Salida.find();

    return res.status(200).json(salidas);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getSalidasPaginations = async (req, res) => {
  try {
    const queryLimit = Number(req.query.limit) || 10,
      querySkip = Number(req.query.skip) || 0;
    
    const salidas = await Salida.find().skip(querySkip).limit(queryLimit);
    const count = await Salida.count();

    return res.status(200).json({
      content: salidas,
      total: count,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getSearchDateCurrentSalidas = async (req, res) => {
  try {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    const salidasHoy = await Salida.find({
      createdAt: formattedDate,
    });

    return res.status(200).json(salidasHoy);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getSearchConsultaInventario = async (req, res) => {
  try {
    const queryLimit = Number(req.query.limit) || 5,
      querySkip = Number(req.query.skip) || 0;
    const { searchInventario } = req.params;

    const salidaSearch = await Inventario.find({
      $or: [
        { code: { $regex: ".*" + searchInventario + ".*", $options: "i" } },
        { product: { $regex: ".*" + searchInventario + ".*", $options: "i" } },
        { creado: { $regex: searchInventario, $options: "i" } },
      ],
    })
    .skip(querySkip)
    .limit(queryLimit);

    const salidaSearchCount = await Inventario.find({
      $or: [
        { code: { $regex: ".*" + searchInventario + ".*", $options: "i" } },
        { product: { $regex: ".*" + searchInventario + ".*", $options: "i" } },
        { creado: { $regex: searchInventario, $options: "i" } },
      ],
    })

    let count = salidaSearchCount.length;

    return res.status(200).json({
      cotent: salidaSearch,
      total: count,
    })

  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getSearchSalida = async (req, res) => {
  try {
    const queryLimit = Number(req.query.limit) || 10,
      querySkip = Number(req.query.skip) || 0;
    const { search } = req.params;

    const salidaSearch = await Salida.find({
      $or: [
        { code: { $regex: ".*" + search + ".*", $options: "i" } },
        { product: { $regex: ".*" + search + ".*", $options: "i" } },
        { creado: { $regex: search, $options: "i" } },
      ],
    })
      .skip(querySkip)
      .limit(queryLimit);

    let count = await Salida.count();

    return res.status(200).json({
      cotent: salidaSearch,
      total: count,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};
