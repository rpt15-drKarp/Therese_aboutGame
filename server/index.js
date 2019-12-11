require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
// const {db, aboutGameFeatures} = require('../db/index.js');
const db = require('../db/mysql/mysqlConfig.js');
const compression = require('compression');

const app = express();

app.get('*js', (req, res, next) => {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use('/', express.static(__dirname + '/../public'));
app.use('/:gameId', express.static(__dirname + '/../public'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/api/features', function (req, res){
//   aboutGameFeatures(function(err, data){
//     if(err){
//       console.log(err);
//     }else{
//       res.send(JSON.stringify(data));
//     }
//   });
// });

app.get(`/api/features/:gameId`, (req, res) => {
  db.pool.query(`SELECT * FROM about WHERE (gameId = ${req.params.gameId})`
  ).then((game) => {
    res.status(200);
    res.send(game);
  }).catch((err) => {
    res.sendStatus(404);
    console.error(err);
  });
  // db.retrieve(req.params.gameId).then((game) => {
  //   res.status(200);
  //   res.send(game);
  // }).catch((error) => {
  //   res.sendStatus(404);
  //   console.error(error);
  // });
});

app.post('/api/features/', (req, res) => {
  db.pool.query(`INSERT INTO about (aboutHeader, aboutBody, featureTitle, features) VALUES (${req.body.aboutHeader}, ${req.body.aboutBody}, ${req.body.featureTitle}, ${req.body.features})`).then((success) => {
    res.sendStatus(201);
  }).catch((err) => {
    res.sendStatus(404);
    console.error(err);
  });
  // db.save(req.body).then((result) => {
  //   res.status(201);
  //   res.set('Location', `/api/overview/${result.game_id}`);
  //   res.send('Game features created');
  // }).catch((err) => {
  //   res.status(500);
  //   res.send('Unable to save to database: ', err);
  // });
});

app.put(`/api/features/:gameId`, (req, res) => {
  var query;
  if (req.body.aboutHeader) {
    query = `UPDATE about SET (aboutHeader = ${req.body.aboutHeader}) WHERE (gameId = ${req.params.gameId})`;
  } else if (req.body.aboutBody) {
    query = `UPDATE about SET (aboutBody = ${req.body.aboutBody}) WHERE (gameId = ${req.params.gameId})`;
  } else if (req.body.featureTitle) {
    query = `UPDATE about SET (featureTitle = ${req.body.featureTitle}) WHERE (gameId = ${req.params.gameId})`;
  } else if (req.body.features) {
    query = `UPDATE about SET (features = ${req.body.features}) WHERE (gameId = ${req.params.gameId})`;
  }
  db.pool.query(query).then((success) => {
    res.sendStatus(201);
  }).catch((err) => {
    res.sendStatus(404);
    console.error(err);
  });
});

app.delete(`/api/features/:gameId`, (req, res) => {
  db.pool.query(`DELETE FROM about WHERE (gameId = ${req.params.gameId})`).then((success) => {
    res.end();
  }).catch((err) => {
    res.sendStatus(404);
    console.error(err);
  });
});

const port = 3306;
app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
