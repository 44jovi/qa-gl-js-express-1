const mongoose = require('mongoose');

// MongoDB in this instance needs to use IPv4
// So cannot use `localhost` in the URI
const uri = 'mongodb://127.0.0.1:27017/cats';

mongoose
  .connect(uri)
  .then(() => {
    console.log('good connection!');
  })
  .catch((err) => {
    console.log('bad connection...', err);
  });

// Schemas give structure to documents
const catSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  colour: String,
  evil: Boolean,
});

// Model, like a DAO to interact with the DB
const catModel = mongoose.model('cat', catSchema);

module.exports = { catModel };
