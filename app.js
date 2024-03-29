const path = require('path')
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors')
const userRauter = require('./routes/userRouter')
const authContact = require('./routes/auth')
const contactRauter = require('./routes/contactRouter')
const shopRauter = require('./routes/shopRouter')
const reviewsRauter = require('./routes/reviewsRouter');
const AppError = require('./utills/appError.js');
const globalErrorHandler = require('./controllers/errorController');
//const { engine } = require('express-handlebars');
const fileupload = require('express-fileupload');

const app = express()

// Set up Handlebars as the view engine
//app.engine('handlebars', engine());
//app.set('view engine', 'handlebars');
//app.set('views', './views');

// 1) GLOBAL MIDDLEWARES
// Serving static files
//app.use(express.static(`${__dirname}/src/pickk-shop`));  //dist/pickk-shop
app.use(express.static(path.join(__dirname, 'public/public/build')));

// Set security HTTP headers
app.use(helmet());

// Development logging
/* if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} */

// File uploading
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(fileupload());  

// Limit requests from same API
const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Init Middleware
app.use(express.json({ extended: false }));

// Body parser, reading data from body into req.body
//app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
  


// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'name',
      'summary',
      'imageCover'
    ]
  })
);

app.use(cors({
    credentials:true,
    // origin:"http://localhost:3001"
}))

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// 3) ROUTES
app.use('/api/shops', shopRauter)
app.use('/api/users', userRauter)
app.use('/api/auth', authContact)
app.use('/api/contacts', contactRauter)
app.use('/api/review', reviewsRauter)

// Serve Static Access in Production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('public/public/build'))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'public/public' ,'build', 'index.html')))
}

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app; 