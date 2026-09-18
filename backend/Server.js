require("dotenv").config();
const app = require("./src/app"); 

const PORT = process.env.PORT || 5000;

const ConnectDB = require("./src/config/db")

const startServer = async ()=>{
 await ConnectDB();
}

startServer();


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});