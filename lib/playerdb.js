"use strict";

require('./model/coverpage');
const config = require('config');
const rp = require('request-promise');
const mongoose = require('mongoose');
const coverpage = mongoose.model('coverpage');

const PlayerDB = module.exports = function() {
};

PlayerDB.prototype.getTestData = async function() {
	let results = await coverpage.find({}).skip(0).limit(2).exec();
	return results ;
};

PlayerDB.prototype.getChannels = async function(params) {
  let {skip, total} = params;
	let results = await coverpage.find({}).skip((Number)(skip)).limit((Number)(total)).exec();
	return results ;
};

PlayerDB.prototype.getDynamicChannels = async function(startpoint) {
	//let {startpoint} = params;
	let uri = config.higgstv.channels+`?sort=last_modified&desc=1&start=${startpoint}`;
	//console.log(uri);
	let results = await rp(uri);
	return results ;
};

PlayerDB.prototype.getVideo = async function(params) {
  let {id} = params;
	let results = await rp(config.higgstv.channel+`?id=${id}`)
	return results ;
};
