const path = require('path');
const express = require('express');
const engies = require('consolidate');
const app = express();
const port = 3000 || process.env.NODE_ENV;

app.engine('hbs', engies.handlebars);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs')

app.get('/', function onRoot(req, res) {
  res.render('index', { hello: 'hola', world: 'mundo' });
});

const server = app.listen(port, function onListening() {
  console.log(`Listening on http://localhost:${server.address().port}`);
});