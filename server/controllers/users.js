import User from "../models/User.js";
import Graphsh from "../models/Graphsh.js"
/*Read */
export const getUser = async (req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({message:err.message});
    }
}

export const setCrops = async (req,res)=>{
    try {
        const {id,croper,date} = req.body;
        console.log(date)
        const user = await User.findById(id);
        console.log(id);
        if(!user.crops.includes(croper)){
            user.crops.push(croper)
            user.Start.push(date);
        }
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({message:err.message});
    }
}

export const delCrops= async (req,res)=>{
    try {
        const {id,croper} = req.body;
        const user = await User.findById(id);
        console.log(id,croper)
        user.crops.pop(croper);
        await user.save();

    } catch (err) {

        res.status(404).json({message:err.message});
    }
}

export const cropGraph = async (req,res)=>{
    try {
        const {cropname} = req.body;
        console.log(cropname)
        const crops = await Graphsh.findOne({cropname : cropname});
        if(!crops) return res.status(400).json({msg: "Crop does not exist"});
        res.status(200).json(crops);
    } catch (err) {
        res.status(404).json({message:err.message});
    }
}