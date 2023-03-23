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
        min:10,
        max:10
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
        min:12,
        max:12,
        unique: true
    },
    crops:{
        type:Array,
        default:[]
    },
    landsize:Number,

},
{ timestamp:true} );

const kisanDb = mongoose.connection.useDb('Kisan');
const user = kisanDb.model("User",UserSchema,'users');
export default user;