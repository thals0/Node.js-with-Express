const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongoClient = require('./mongo');

// 익명함수 전달
module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'id',
        passwordField: 'password',
      },
      async (id, password, cb) => {
        const client = await mongoClient.connect();
        const userCursor = client.db('node1').collection('users');
        // {id : id} = {id}
        const idResult = await userCursor.findOne({ id });
        console.log(idResult);
        if (idResult !== null) {
          if (idResult.password === password) {
            cb(null, idResult);
          } else {
            cb(null, false, { message: '비밀번호가 틀렸습니다.' });
          }
        } else {
          cb(null, false, { message: '해당 id가 없습니다.' });
        }
      }
    )
  );

  // idResult -> user
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  // 통신을 해야하니까 async사용
  passport.deserializeUser(async (id, cb) => {
    const client = await mongoClient.connect();
    const userCursor = client.db('node1').collection('users');
    const result = await userCursor.findOne({ id });
    if (result !== null) cb(null, result);
  });
};
