const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors')

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config/config.env' });
const app = require('./app');

const DB = process.env.MONGOURI.replace('<PASSWORD>', process.env.MONGO_PASSWORD,
 {useNewUrlParser: true, 
  useFindAndModify:true, 
  useUnifiedTopology: true
})

mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful!'));

  mongoose.set('strictQuery', true)

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...'.cyan.underline.bold);
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});



/* const express = require('express');
const path = require('path');
const app = express();
app.use(express.static('./dist/pickk-shop'));
app.get('/*', (req,es) => 
res.sendFile('index.html', {root: 'dist/pickk-shop'}
))

app.listen(process.env.PORT || 8085); */