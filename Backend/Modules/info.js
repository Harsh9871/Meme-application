const mongoose = require('mongoose');

const infoSchema = new mongoose.Schema({
    title: String,
    imgLocation: String,
    time: { type: Date, default: Date.now },
    description: String, // Corrected field name from 'desciption' to 'description'
    account: String
});

const Info = mongoose.model('Info', infoSchema); // Corrected mongoose spelling

module.exports = Info;
