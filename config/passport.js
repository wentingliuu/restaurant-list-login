const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const bcrypt = require('bcryptjs')

const User = require('../models/userSchema')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
    User.findOne({
      $and: [{ email },
        { loginMethod: 'email' }]
    }).then(user => {
      if (!user) {
        return done(null, false, req.flash('msg', '此 email 尚未註冊！'))
      }
      return bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch) {
          return done(null, false, req.flash('msg', 'email 或密碼輸入錯誤，請再次確認！'))
        }
        return done(null, user)
      })
    })
      .catch(err => done(err, false))
  }))
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json
    User.findOne({
      $and: [{ email },
        { loginMethod: 'facebook' }]
    }).then(user => {
      if (user) return done(null, user)

      const randomPassword = Math.random().toString(36).slice(-8)
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(randomPassword, salt))
        .then(hash => User.create({
          name: name || '吃貨',
          email,
          password: hash,
          loginMethod: 'facebook'
        }))
        .catch(err => done(err, false))
    })
  }))
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json
    User.findOne({
      $and: [{ email },
        { loginMethod: 'google' }]
    }).then(user => {
      if (user) return done(null, user)

      const randomPassword = Math.random().toString(36).slice(-8)
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(randomPassword, salt))
        .then(hash => User.create({
          name: name || '吃貨',
          email,
          password: hash,
          loginMethod: 'google'
        }))
        .catch(err => done(err, false))
    })
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}
