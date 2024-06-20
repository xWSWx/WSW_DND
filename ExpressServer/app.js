var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

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



module.exports = app;
