import express from "express";
import customerRouter from "./routes/customer";
import { AllRoutes } from "./routes/RouteUrls";

 
require("dotenv").config(); // Load environment variables from a .env file into process.env
const cors = require("cors"); // Import the CORS middleware
const app = express(); // Create an Express application instance
const path = require("path");
const bodyParser = require('body-parser');
 
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) for all routes
 
app.set("view engine", "ejs"); // view resolver
app.set("views", path.join(__dirname, "views"));
// const ejs = require('ejs');

// let ejsOptions = {
//   // delimiter: '?', Adding this to tell you do NOT use this like I've seen in other docs, does not work for Express 4
//   async: true
// };

// // The engine is using a callback method for async rendering
// app.engine('ejs', async (path, data, cb) => {
//   try{
//     let html = await ejs.renderFile(path, data, ejsOptions);
//     cb(null, html);
//   }catch (e){
//     cb(e, '');
//   }
// });

const PORT = process.env.SERVER_PORT || 8000; // Set the server's port from environment variables or default to 8000
 
app.use(express.json()); // Parse incoming JSON requests and make the data available in req.body
app.use(bodyParser.urlencoded({ extended: true })); // to handle body 
  // must to pass post requests 
app.locals.allRoutes = AllRoutes;
const baseApi = AllRoutes.customers.BASE_API;

// app.use(customerRouter); // or we can use app.use("/baseapi", customerRouter);

app.use(baseApi,customerRouter) ; 



app.listen(PORT, () => {
    // Start the server and listen on the specified port
    console.log(`Server is running on http://localhost:${PORT}`); // Log a message indicating the server is running
  });