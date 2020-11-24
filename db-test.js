const db = require("./models");

db.user
  .findOrCreate({
    where: { email: "email@email.com" }
  })
  .then(([user, created]) => {
    console.log(user);
    user
      .createHistory({
        searched: "Taco Bell"
      })
      .then(history => {
        console.log(`${user.email} searched ${history.searched}`);
      });
  });
