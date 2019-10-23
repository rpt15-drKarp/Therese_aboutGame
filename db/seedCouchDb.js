const nano = require('nano');
const couch = nano('http://127.0.0.1:5984');
const faker = require('faker');

let batchNum = 10000;
let target = 10000000;

// creates database
couch.db.create('about_game', function(err) {
  if (err && err.statusCode === 412) {
    couch.db.destroy('about_game')
    .then((body) => {
      couch.db.create('about_game')
      .then((success) => {
        makeBatch(batchNum);
      });
    });
  } else if (err) {
    console.error('Database error: ', err);
  } else {
    makeBatch(batchNum);
  }
});

let start = new Date();
const aboutGames = couch.db.use('about_game');

let batch = [];
let success = 0;
let total = 0;

const makeBatch = (num) => {
  for (let i = 0; i < num; ++i) {
    // let game = {
    //   gameId: (i + 1 + (success * num)),
    //   aboutHeader: faker.lorem.sentence(),
    //   aboutBody: faker.lorem.paragraph(),
    //   featureTitle: faker.loremm.sentence(),
    //   features: faker.lorem.paragraphs()
    // }
    // batch.push(game);
    batch.push({
      gameId: (i + 1 + (success * num)),
      aboutHeader: faker.lorem.sentence(),
      aboutBody: faker.lorem.paragraph(),
      featureTitle: faker.loremm.sentence(),
      features: faker.lorem.paragraphs()
    });
  }
  insertBatch(batch, batch.length);
};

const insertBatch = (docs, num) => {
  aboutGames.bulk({ docs }).then((data) => {
    total += num;
    success++;
    let end = new Date();
    let time = (end - start) / 1000;
    batch = [];
    console.log(`Inserted ${total} in ${time} seconds`);
    if (total < target) {
      makeBatch(batchNum);
    }
  });
};
