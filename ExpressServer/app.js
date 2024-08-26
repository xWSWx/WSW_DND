const express = require('express');
const cors = require('cors');
//const { swaggerUi, swaggerSpec } = require('./config/swagger');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
var bodyParser = require('body-parser')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passport = require('./auth');

const createError = require('http-errors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const charactersRoutes = require('./routes/charactersRoutes');
const sequelize = require('./config/sequelize');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(bodyParser.json());
app.use(logger('dev'));

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/characters', charactersRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


app.post('/login', passport.authenticate('local'), (req, res) => {
    res.send({ id: req.user.id, username: req.user.username });
});

app.post('/logout', (req, res) => {
    req.logout(err => {
        if (err) { return next(err); }
        res.sendStatus(200);
    });
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

const items = [
    { id: 1, name: "Item 1", initiative: 3, current: false },
    { id: 2, name: "Item 2", initiative: 1, current: false },
    { id: 3, name: "Item 3", initiative: 2, current: false },
    { id: 4, name: "Item 4", initiative: 5, current: false },
    { id: 5, name: "Item 5", initiative: 5, current: false }
];

let currentIndex = 0;

items.sort((a, b) => a.initiative - b.initiative);
// Set the first item as current
if (items.length > 0) {
    items[0].current = true;
}

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api/items', (req, res) => {
    res.json(items);
});

app.post('/api/items/next', (req, res) => {
    if (items.length > 0) {
        items[currentIndex].current = false;
        currentIndex = (currentIndex + 1) % items.length;
        items[currentIndex].current = true;
        res.json(items[currentIndex].id);
    } else {
        res.status(400).send('No items available');
    }
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

sequelize.sync().then(() => {
    /*app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });*/
});

module.exports = app;
