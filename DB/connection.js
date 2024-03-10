const mongoose =  require('mongoose')

const connectionString = process.env.DATABASE


mongoose.connect(connectionString).then(()=>{
    console.log('Mongodb Connected successfully');
}).catch((err)=>{
    console.log(`Mongodb connection failed due to ${err}`);
})