const db = require("./models");

db.restaurantGoer
  .findOrCreate({
    where: { email: "email@email.com" }
  })
  .then(([restaurantGoer, created]) => {
    console.log(restaurantGoer);
    restaurantGoer
      .createHistory({
        searched: "Taco Bell"
      })
      .then(history => {
        console.log(`${restaurantGoer.email} searched ${history.searched}`);
      });
  });
