import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connedctedDb = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            }
        );
    } catch (error) {
        console.log("connection didn't happen",error);
        process.exit(1)
    }
}

export default connedctedDb