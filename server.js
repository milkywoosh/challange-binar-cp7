const { urlencoded } = require('express');
const express = require('express');
const app = express();
const router = require('./router/router');
const authRouter = require('./router/authRouter');

const {passportAdmin, passportPlayer} = require('./lib/passport')
app.use(passportAdmin.initialize())
app.use(passportPlayer.initialize())
// ==> spy bisa input username-password JWT di POSTMAN, show JSON
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 



// const passport = require('passport');
// app.use(passport.initialize())
// app.use(passport.session());
const db = require("./models/index");
const NEVER_CHANGE = { force: false };
db.sequelize.sync(NEVER_CHANGE); // if true: overwrite the data table every NPM RUN START, false: not overwrite!!

app.set('view engine', 'ejs');
app.use(router);
app.use(authRouter);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});

// JIKA MASIH MASALAH CHANGE USER -> POSTGRES  