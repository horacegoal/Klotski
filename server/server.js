const express = require('express');
const path = require('path');

var app = express();
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The app is on port ${port}`)
})
