"use strict";

require('./model/coverpage');
const config = require('config');
const rp = require('request-promise');
const mongoose = require('mongoose');
const coverpage = mongoose.model('coverpage');

const PlayerDB = module.exports = function() {
};

PlayerDB.prototype.getData = async function() {
	var results = await coverpage.find({}).skip(0).limit(2).exec();
	return results ;
};

PlayerDB.prototype.getDataByLimit = async function(params) {
  const {skipNum, limitNum} = params;
	var results = await coverpage.find({}).skip((Number)(skipNum)).limit((Number)(limitNum)).exec();
	return results ;
};

PlayerDB.prototype.getVideo = async function(params) {
  const {id} = params;
	var results = await rp(config.Player.getch+id)
	return results ;
};
