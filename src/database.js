import mongoose from "mongoose";

mongoose.connect("mongodb://mongo:eOrYsPEcCUbHbFBcdNidHfshgzUPdTBk@autorack.proxy.rlwy.net:47971", {
})
    .then(db => console.log('Db is connected'))
    .catch(error => console.log(error))