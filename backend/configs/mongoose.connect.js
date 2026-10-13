import mongoose from 'mongoose'

async function connectMongoDB(uri){
    const tempVar = await mongoose.connect(uri);
    console.log("Mongo Daemon connected successfully!");
    return tempVar;
}
export { connectMongoDB }