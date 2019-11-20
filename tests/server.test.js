const request = require ('request');

// test('API call works if property access of body can result in a string', (done) => {
//   request('http://localhost:3003/api/features', (err, res, body) => {
//     let features = JSON.parse(body);
//     //features is an array of objects
//     expect(typeof(features[0].features)).toBe('string');
//     done();
//   });
// });

test('test GET to mysql', (done) => {
  request('http://localhost:3306/api/features/9999999', (err, res, body) => {
    let game = JSON.parse(body);
    console.log(game);
    expect(game.length).toEqual(4);
    expect(typeof(game[0].features)).toBe('string');
    done();
  });
});
