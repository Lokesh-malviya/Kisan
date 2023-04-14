import  express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import cropRoute from "./routes/crop.js";
/* import postRoutes from "./routes/posts.js"; */
import { register } from './controllers/auth.js';
import { verifyToken } from "./middleware/auth.js";
/* import {users} from "./data/index.js"; */
import Graphsh from "./models/Graphsh.js";
import User from "./models/User.js";
import { graphs } from "./data/index.js";


/* Configurations  */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config()
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit : "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended: true}));
app.use(cors());
app.use("/assets",express.static(path.join(__dirname,'public/assets')));


/* file storge */
const storage= multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/assets");
    },
    filename: function(req,file,cb){
        cb(null,file.originalname);
    } 
});

const upload = multer({ storage });
/* File storage */
app.post("/auth/register",register);
/* app.post("/crop",verifyToken,upload.single("picture"),createPost);
app.post("/cropdetect",verifyToken,upload.single("picture"),createPost)) */

/* Routes */
app.use("/auth",authRoutes);
app.use("/users",userRoutes);
app.use("/crop",cropRoute);
/* app.use("/posts",postRoutes); */
/* Mongoose setup*/
const PORT = process.env.PORT || 6001;
mongoose.set("strictQuery", false);
mongoose
.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    app.listen(PORT, ()=> console.log(`Server Port: ${PORT}`));
    /*Add data one time */
    /* User.insertMany(users); */
   /*  Graphsh.insertMany(graphs); */
}).catch((error)=> console.log(`${error} did not connet`));

