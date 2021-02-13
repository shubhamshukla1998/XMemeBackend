const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

// load config
dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

//use cors
app.use(cors());

//Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/memes', require('./routes/memes'));

app.get('/', (req, res) => {
  res.send('API RUNNING');
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => console.log(`Server Started at port ${PORT}`));
