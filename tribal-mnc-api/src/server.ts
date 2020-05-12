import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import routes from "./Routes/";
import cors = require("cors");
import helmet = require("helmet");

const app = express();

var whitelist = ['http://localhost:4200/']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}


// Call midlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
  
//Set all routes from routes folder
app.use("/", routes);

app.listen(3000, () => {
  console.log("Server started on port 3000!");
});

