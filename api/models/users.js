let mongoose = require('mongoose');

let ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({ }, { timestamps: true });

module.exports = mongoose.model('Challenge', userSchema);