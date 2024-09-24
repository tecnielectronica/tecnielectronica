import mongoose from "mongoose";

mongoose.connect("mongodb://mongo:oAukhzNqTcIVjdbcnkgePXOIwgEokRjQ@junction.proxy.rlwy.net:40781", {
})
    .then(db => console.log('Db is connected'))
    .catch(error => console.log(error))