const express = require('express');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, './front')));

app.post('/save', (req, res) => {
   const { text, fileName } = req.body;
   console.log(text);
   fs.writeFile(`${fileName}.json`, JSON.stringify(text), err => {
      if (err) {
         return console.log(err);
      }
      console.log('The file was saved!');
      res.end();
   });
});

app.get('*', (req, res) => {
   res.sendFile('index.html', {
      root: path.join(__dirname, '/front'),
   });
});

app.listen(port, '127.0.0.1', () => {
   console.log('server is listening...');
});
