import mongoose from "mongoose";

const connection = {};

export default function DataBase(Base)
{
     var source = "mongodb+srv://ibgsp:170597@cluster0.vo4fy.mongodb.net/"+ Base +"?retryWrites=true&w=majority&&ssl=true"

     var source2 = "mongodb://ibgsp:170597@cluster0-shard-00-00.vo4fy.mongodb.net:27017,cluster0-shard-00-01.vo4fy.mongodb.net:27017,cluster0-shard-00-02.vo4fy.mongodb.net:27017/"+ Base +"?ssl=true&replicaSet=atlas-fcyyj2-shard-0&authSource=admin&retryWrites=true&w=majority"


    const connection =  mongoose.createConnection(source2,{
            useNewUrlParser : true,
            useUnifiedTopology: true
    });
    
    return connection;
}

