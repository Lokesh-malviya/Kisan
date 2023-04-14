import mongoose from "mongoose";

const GraphSchema = new mongoose.Schema({
    cropname:{
        type: String,
    },
    month:{
        type:Array,
        default:[]
    },
    rate:{
        type:Array,
        default:[]
    },
    threshold:Number,
},
{ timestamp:true} );

const kisanDb = mongoose.connection.useDb('Kisan');
const graphsh = kisanDb.model("Graph",GraphSchema,'graph');
export default graphsh;