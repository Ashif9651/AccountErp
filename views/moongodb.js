const mongoose= require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017',{
    dbName:'RegisteredUser'
}).then(()=>console.log('Database conncted')).catch((e)=>console.log(e));

const mongooseSchema= new mongoose.Schema({
    name : {type : String, required :true},
    email : {type : String, required :true},
    psw : {type : String, required :true},
    psw_r: {type : String, required :true},
})

const Massge = mongoose.model("user",mongooseSchema);

module.exports =Massge;