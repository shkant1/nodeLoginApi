const express = require("express");
const app = express();
const mongoose=require("mongoose");
const morgan = require("morgan");
const bodyParser =require('body-parser');
var cookieParser =  require('cookie-parser')
const expressValidator =require("express-validator");
const dotenv = require("dotenv");
const fs = require('fs');
const cors = require('cors');
dotenv.config();

//db

mongoose
.connect(process.env.MONGO_URI, {
useUnifiedTopology: true,
useNewUrlParser: true,
})
.then(() => console.log('DB Connected!'))
.catch(err => {
console.log(`DB Connection Error: ${err.message}`);
});


/*mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true})
.then(()=>  console.log("DB Connected"));
mongoose.connection.on("error",err=>{console.log(`DB Connection: ${err.message}`)});*/
//bring in routes
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
// apiDocs
app.get("/", (req, res) => {
    fs.readFile("docs/apiDocs.json", (err, data) => {
        if (err) {
            res.status(400).json({
                error: err
            });
        }
        const docs = JSON.parse(data);
        res.json(docs);
    });
});

/*const myOwnMiddleware=(req,res,next)=>{ 
	console.log("middleware applied!!!");
	next();
}*/
//

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());  
//app.use(myOwnMiddleware);
 app.use("/",postRoutes); 
 app.use("/", authRoutes);
 app.use("/", userRoutes);
app.use(function(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({ error: "Unauthorized!" });
    }
});


const port= process.env.PORT ||8080;
app.listen(port,()=>{
	console.log(`A node js API is listening on port :${port}` );
});  