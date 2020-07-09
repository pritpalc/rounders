let mongoose = require('mongoose');

let ObjectId = mongoose.Schema.Types.ObjectId;

const challengeSchema = new mongoose.Schema({
  songs: [{
    type: String,
    required: true
  }],
  challenger: {
    type: String,
    required: true
  },
  challengee: {
    type: ObjectId,
    ref: 'User',
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Challenge', challengeSchema);