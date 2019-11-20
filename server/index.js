require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
// const {db, aboutGameFeatures} = require('../db/index.js');
const db = require('../db/mysqlConfig.js');

const app = express();

app.use('/:gameId', express.static(__dirname + '/../public'));
app.use(express.static('public'));
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
  db.pool.query(`SELECT aboutHeader, aboutBody, featureTitle, features FROM about WHERE (gameId = ${req.params.gameId})`).then((game) => {
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

// app.post('/api/features/', (req, res) => {
//   db.save(req.body).then((result) => {
//     res.status(201);
//     res.set('Location', `/api/overview/${result.game_id}`);
//     res.send('Game features created');
//   }).catch((err) => {
//     res.status(500);
//     res.send('Unable to save to database: ', err);
//   });
// });

// app.put(`/api/features/:gameId`, (req, res) => {
//   db.update(req.params.gameId, req.body).then((results) => {
//     res.sendStatus(200);
//   }).catch((err) => {
//     console.error(err);
//     res.sendStatus(500);
//   });
// });

// app.delete(`/api/features/:gameId`, (req, res) => {
//   db.remove(req.params.gameId).then((results) => {
//     if (!results) {
//       res.sendStatus(404);;
//     } else {
//       res.sendStatus(200);
//     }
//   }).catch((err) => {
//     console.error(err);
//     res.sendStatus(500);
//   });
// });

const port = 3306;
app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
