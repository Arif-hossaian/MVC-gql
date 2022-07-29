const express = require('express');
const colors = require('colors');
const schema = require('./schema/Schema');
const cors = require('cors');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const URI = process.env.MONGODB_URL;

mongoose.connect(
  URI,
  {
    autoIndex: false,
  },
  (err) => {
    if (err) throw err;
    console.log(`MongoDB Connected`.cyan.underline.bold);
  }
);

// Start server listening
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Express is listening on port ${port}`);
});
