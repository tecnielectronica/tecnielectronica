import mongoose from "mongoose";

mongoose.connect("mongodb://mongo:iwMepxKRTzetTCPunjSndmWCTKwWeRQG@junction.proxy.rlwy.net:45558", {
})
    .then(db => console.log(db.Schema))
    .catch(error => console.log(error))