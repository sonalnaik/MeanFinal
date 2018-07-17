var mongoose = require('mongoose');
var Schema =mongoose.Schema;

var Company  = new Schema({
  company: {
    type: String 
  },
  contact: {
    type: String
  },
  country: {
    type: String
  }
  
  
},{
    collection: 'Company'
});

module.exports = mongoose.model('Company',Company);