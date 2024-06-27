const app = require("./app");
const connectDb =require('./config/db');
port=process.env.PORT || 5000
connectDb().then(()=>{
    app.listen(port,()=>{
        console.log(`servet: listening on port ${port}`);
    })
})