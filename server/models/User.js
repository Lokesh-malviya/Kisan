import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    lastName:{
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    mobileNo:{
        type:String,
        required:true,
    },
    password:{
        type: String,
        required: true,
        min: 5,
    },
    picturePath:{
        type: String,
        default :""
    },
    location:String,
    aadharnumber:{
        type:String,
        required:true,
        unique: true
    },
    crops:{
        type:Array,
        default:[]
    },
    landsize:{
        type:String, 
    },

},
{ timestamp:true} );

const kisanDb = mongoose.connection.useDb('Kisan');
const user = kisanDb.model("User",UserSchema,'users');
export default user;