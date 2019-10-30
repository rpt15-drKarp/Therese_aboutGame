const db = require('./mysqlConfig.js');
const faker = require('faker');

let total = 0;
let start = new Date();

const seed = async (num) => {
  let queryStr = 'INSERT INTO about (aboutHeader, aboutBody, featureTitle, features) VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)';
  let params = [];

  for (let i = 0; i < num; ++i) {
    for (let h = 0; h < 20; ++h) {
      params.push(faker.lorem.sentence());
      params.push(faker.lorem.paragraph());
      params.push(faker.lorem.sentence());
      params.push(faker.lorem.paragraphs());
    }
  }

  while (total < 10000000) {
    try {
      await db.pool.query(queryStr, params)
        .then(() => {
          total += 20;
          let end = new Date();
          let time = (end - start) / 1000;
          console.log(`Seeded ${total} in ${time} seconds`);
        })
        .catch((err) => {
          console.error('Seed 1 error: ', err);
        });
    } catch (err) {
      console.error('Seed 2 error: ', err);
    }
  }

  return process.exit();
};

seed(10000);