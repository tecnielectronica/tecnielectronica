import Inventario from "../models/Inventario";

export const createInventario = async (req, res) => {
  const { code, product, stock, precio, fecha, salida, nota } = req.body;

  try {
    const newInventario = new Inventario({
      code,
      product,
      stock: stock - salida,
      precio,
      fecha,
      salida,
      nota,
    });

    const inventarioSaved = await newInventario.save();
    return res.status(200).json(inventarioSaved);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateInventarioById = async (req, res) => {
  try {
    const findOldInventario = await Inventario.findOne({
      _id: req.params.inventarioId,
    });
    let updatebody = {};
    let updateInventario;

    let stock;
    let operation =
    (Number(findOldInventario.stock) != req.body.stock &&
    Number(findOldInventario.salida) != req.body.salida) ||
    (Number(findOldInventario.salida) != req.body.salida &&
    Number(findOldInventario.stock) === req.body.stock);

    if (operation) {
      if (Number(findOldInventario.salida) != req.body.salida) {
        let difference =  Math.abs(Number(findOldInventario.salida) - Number(req.body.salida));

        if (findOldInventario.salida < req.body.salida) {
          stock = req.body.stock - difference;
        }
        else {
          stock = req.body.stock + difference;
        }
      } else {
        if (req.body.salida > 0) {
          stock = req.body.stock - req.body.salida;
        } else {
          stock = req.body.stock + req.body.salida;
        }
      }
    } else if (
      Number(findOldInventario.stock) != req.body.stock &&
      Number(findOldInventario.salida) === req.body.salida
    ) {
      stock = req.body.stock;
    } else {
      stock = req.body.stock;
    }

    updatebody = {
      stock: stock,
      code: req.body.code,
      product: req.body.product,
      precio: req.body.precio,
      fecha: req.body.fecha,
      salida: req.body.salida,
      nota: req.body.nota,
    };

    updateInventario = await Inventario.findByIdAndUpdate(
      req.params.inventarioId,
      updatebody,
      {
        new: true,
      }
    );

    return res.status(200).json(updateInventario);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteInventarioById = async (req, res) => {
  try {
    const { inventarioId } = req.params;

    const validacion = await Inventario.findById(inventarioId);
    if (!validacion) {
      res.json("No se ha encontrado el producto del inventario");
    } else {
      await Inventario.findByIdAndDelete(inventarioId);
      res
        .status(200)
        .json("El producto del inventario fue eliminando correctamente!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getInventarios = async (req, res) => {
  try {
    const inventarios = await Inventario.find();

    res.status(200).json(inventarios);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getInventarioPaginations = async (req, res) => {
  try {
    const count = await Inventario.count();
    const queryLimit = Number(req.query.limit) || 10,
      querySkip = Number(req.query.skip) || 0;

    const inventarios = await Inventario.find()
      .skip(querySkip)
      .limit(queryLimit);

    return res.status(200).json({
      content: inventarios,
      total: count,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getSearchInventario = async (req, res) => {
  try {
    const queryLimit = Number(req.query.limit) || 10,
      querySkip = Number(req.query.skip) || 0;
    const { search } = req.params;

    // validar fecha
    
    const inventarioSearch = await Inventario.find({
      $or: [
        { code: { $regex: ".*" + search + ".*", $options: "i" } },
        { product: { $regex: ".*" + search + ".*", $options: "i" } },
        { fecha: { $gte: search } },
      ],
    })
      .skip(querySkip)
      .limit(queryLimit);

    const inventarioCount = await Inventario.find({
      $or: [
        { code: { $regex: ".*" + search + ".*", $options: "i" } },
        { product: { $regex: ".*" + search + ".*", $options: "i" } },
        { fecha: { $gte: search } },
      ],
    });

    let count = inventarioCount.length;

    return res.status(200).json({
      content: inventarioSearch,
      total: count,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};
