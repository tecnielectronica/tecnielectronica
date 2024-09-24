import Rol from "../models/Rol";
import User from "../models/User";

function convert(str) {
    var mnths = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12"
      },
      date = str.split(" ");
  
    return [date[2], mnths[date[1]], date[3]].join("-");
}

export const createRoles = async () => {
    try {   
        // contar documentos
        const count = await Rol.estimatedDocumentCount();

        if (count > 0) return;

        // create default roles
        const values = await Promise.all([
            new Rol({ name: "admin"}).save(),
            new Rol({ name: "moderador"}).save()
        ])
    } catch (error) {
        console.log(error);
    }
}

export const createAdmin = async () => {
    const userFound = await User.findOne({ username: "admin" });
    
    if (userFound) return;

    // obtener roles por id
    const roles = await Rol.find({ name: { $in: ["admin"] }});

    // creador un nuevo administrador
    const newUser = await User.create({
        username: "admin",
        password: "superadmin",
        roles: roles.map((role) => role._id)
    });
    
}

createRoles();
createAdmin();