const express = require('express');
const app = express();

const passport = require('passport');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const session = require('client-sessions');
const expressSection = require('express-session');
const cookieParser = require('cookie-parser');
const nunjucks = require('nunjucks');

const chalk = require('chalk');

const router = require('./server/routes');

// middleware
app.use(morgan('dev'));

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(expressSession({ section: 'mySecretKey' }));
app.use(passport.initialize());
app.use(passport.session());

// app.use(session({
//   cookieName: 'session',
//   secret: 'random_string',
//   duration: 30 * 60 * 1000,
//   activeDuration: 5 * 60 * 100
// }));

app.engine('html', nunjucks.render);
app.set('view engine', 'html');

const nunjucksConfigure = nunjucks.configure('server/templates', {
  noCache: true, 
  autoescape: true, 
  express: app
});

// and then include these two lines of code to add the extension:
const AutoEscapeExtension = require("nunjucks-autoescape")(nunjucks);
nunjucksConfigure.addExtension('AutoEscapeExtension', new AutoEscapeExtension(nunjucksConfigure));

// app.use(express.static('server/templates'));
app.use(express.static('browser/public'));
// process.env.PWD = process.cwd();
// app.use('/public', express.static(path.join(process.env.PWD, 'browser/public')));

app.use('/', router);

app.listen(process.env.PORT || 3001, function() {
  console.log( chalk.blue(`App is listening on port ${this.address().port}`) );
});