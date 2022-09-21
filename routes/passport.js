const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const NaverStrategy = require('passport-naver').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;

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

  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.NAVER_CLIENT,
        clientSecret: process.env.NAVER_CLIENT_SECRET,
        callbackURL: process.env.NAVER_CB_URL,
      },
      async (accessToken, refreshToken, profile, cb) => {
        const client = await mongoClient.connect();
        const userCursor = client.db('node1').collection('users');
        const result = await userCursor.findOne({ id: profile.id });
        if (result !== null) {
          cb(null, result);
        } else {
          const newUser = {
            id: profile.id,
            name:
              profile.displayName !== undefined
                ? profile.displayName
                : profile.emails[0].value,
            provider: profile.provider,
          };
          const dbResult = await userCursor.insertOne(newUser);
          if (dbResult.acknowledged) {
            cb(null, newUser);
          } else {
            cb(null, false, {
              message: '네이버 회원 생성 에러',
            });
          }
        }
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CB_URL,
      },
      async (accessToken, refreshToken, profile, cb) => {
        // console.log(profile);
        const client = await mongoClient.connect();
        const userCursor = client.db('node1').collection('users');
        const result = await userCursor.findOne({ id: profile.id });
        if (result !== null) {
          cb(null, result);
        } else {
          const newUser = {
            id: profile.id,
            name:
              profile.displayName !== undefined
                ? profile.displayName
                : profile.emails[0]?.value,
            provider: profile.provider,
          };
          const dbResult = await userCursor.insertOne(newUser);
          if (dbResult.acknowledged) {
            cb(null, newUser);
          } else {
            cb(null, false, {
              message: '구글 회원 생성 에러',
            });
          }
        }
      }
    )
  );

  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_CLIENT,
        callbackURL: process.env.KAKAO_CB_URL,
      },
      async (accessToken, refreshToken, profile, cb) => {
        // console.log(profile);
        const client = await mongoClient.connect();
        const userCursor = client.db('node1').collection('users');
        const result = await userCursor.findOne({ id: profile.id });
        if (result !== null) {
          cb(null, result);
        } else {
          const newUser = {
            id: profile.id,
            name: profile.displayName,
            provider: profile.provider,
          };
          const dbResult = await userCursor.insertOne(newUser);
          if (dbResult.acknowledged) {
            cb(null, newUser);
          } else {
            cb(null, false, {
              message: '카카오 회원 생성 에러',
            });
          }
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
