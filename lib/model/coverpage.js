"use strict";

const config = require('config');
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

mongoose.Promise = Promise

const coverpage = new Schema({
	_id: String,
	cover: { default: String },
	created: Date,
	desc: String,
	last_modified: Date,
	name: String,
	owners: [String],
	tags: [String],
	type: String
}, { collection: 'coverpage' });

mongoose.model(config.database.collection, coverpage);
mongoose.connect(config.database.uri, {
  useMongoClient: true
});

mongoose.connection.on('open', (conn) => {
	console.log('Connected to', mongoose.connection.host + ':' + mongoose.connection.port)
});
mongoose.connection.on('close', () => {
	console.log('Disconnected from', mongoose.connection.host + ':' + mongoose.connection.port)
});
mongoose.connection.on('error', (err) => {
	console.log('MongoDB', err);
});
