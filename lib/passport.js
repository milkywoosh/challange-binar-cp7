// lib/passport.js
const Passport = require('passport').Passport;
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const { User } = require('../models')
require("dotenv").config();

/* Passport JWT Options */
const options = {
   // Untuk mengekstrak JWT dari request, dan mengambil token-nya dari header yang bernama Authorization
   jwtFromRequest: ExtractJwt.fromHeader('authorization'),

   /* Harus sama seperti dengan apa yang kita masukkan sebagai parameter kedua dari jwt.sign di User Model.
      Inilah yang kita pakai untuk memverifikasi apakah tokennya dibuat oleh sistem kita */
   secretOrKey: process.env.JWT_SECRET,
}

const passportPlayer = new Passport(); // new instance utk 2 Authorization berbeda
const passportAdmin = new Passport();

passportPlayer.use(new JwtStrategy(options, async (payload, done) => {
   // payload adalah hasil terjemahan JWT, sesuai dengan apa yang kita masukkan di parameter pertama dari jwt.sign
   
      // for user "Player": cuma boleh main game, gak boleh liat dashboard;
      User.findOne( {
         where: {
            id: payload.id,
            role: "player"
         }
      })
      .then(user => done(null, user))
      .catch(err => done(err, false))
}))

passportAdmin.use(new JwtStrategy(options, async (payload, done) => {
   // payload adalah hasil terjemahan JWT, sesuai dengan apa yang kita masukkan di parameter pertama dari jwt.sign
   User.findOne({
      where: {
         id: payload.id,
         role: "admin"
      }
   })
      .then(user => done(null, user))
      .catch(err => done(err, false))
}))


module.exports = {
   passportAdmin,
   passportPlayer,
}
