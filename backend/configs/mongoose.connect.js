import mongoose from 'mongoose'

async function connectMongoDB(uri) {
    const tempVar = await mongoose.connect(uri);
    console.log("Mongo Daemon connected successfully!");
    console.log(
        "MongoDB host:",
        mongoose.connection.host
    );

    console.log(
        "MongoDB database:",
        mongoose.connection.name
    );
    return tempVar;
}
export { connectMongoDB }