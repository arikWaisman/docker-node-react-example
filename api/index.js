const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./services/passport');

app.use(router);

app.set('port', 3000);

app.listen(app.get('port'), () => {
  console.log(`Server listing: http://localhost:${app.get('port')}/`);
});
