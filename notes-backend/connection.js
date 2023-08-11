const mongoose=require('mongoose');
mongoose.set('strictQuery', true);


const MongoConnect=()=>{
    let mongoURI=process.env.MONGOURI;
    // console.log("a",process.env.MONGOURI,"b");
    mongoose.connect(mongoURI,()=>{
        console.log("Connected");
    })
}

module.exports=MongoConnect;