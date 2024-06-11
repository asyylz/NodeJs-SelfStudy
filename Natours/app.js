const express = require('express');

const morgan = require('morgan');

const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// 1-) MIDDLEWARE // middleware stands between request and response
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // tiny
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2-) ROUTES
app.use('/api/v1/users', userRouter); // mounting router
app.use('/api/v1/tours', tourRouter); // mounting router

app.all('*', (req, res, next) => {
  const err = new Error(
    `Can't find ${req.originalUrl}
      on this server`
  );
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
});

module.exports = app;
