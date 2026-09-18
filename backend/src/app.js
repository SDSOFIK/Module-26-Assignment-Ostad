const express = require("express");
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json()); 

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "News portal running",
  });
});


app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/news', require('./routes/newsRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

module.exports = app;