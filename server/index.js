require('dotenv').config({ path: `../.env.${process.env.NODE_ENV}` })

const { PORT, ENV } = require('../config');
const express = require('express');
const connectDB = require('../config/db');
const cors = require('cors')

const app = express();
const apiRouter = require('./routes/api')

connectDB();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api', apiRouter)

if (ENV === 'production') {
  const path = require('path');
  app.use(express.static(path.join(__dirname, 'app', 'build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'app', 'build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



