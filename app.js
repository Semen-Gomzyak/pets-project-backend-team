const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

const petsRouter = require('./routes/api/pets');
const usersRouter = require('./routes/api/users');
const noticesRouter = require('./routes/api/notices');
const newsRouter = require('./routes/api/news');
const servicesRouter = require('./routes/api/services');
const authRouter = require('./routes/api/auth');

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/pets', petsRouter);
app.use('/api/users', usersRouter);
app.use('/api/notices', noticesRouter);
app.use('/api/news', newsRouter);
app.use('/api/services', servicesRouter);

// app.use('/api/auth', authRouter);

app.use('/public/avatars', express.static('public/avatars'));


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
