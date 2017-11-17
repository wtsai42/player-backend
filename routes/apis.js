"use strict";

const Router = require('koa-router');
const PlayerDB = require('../lib/playerdb');
const router = module.exports = new Router();

const player = new PlayerDB();

router.get('/', function (ctx, next) {
  ctx.body = 'This a default response!';
});

router.get('/channels', async function(ctx, next) {
	var data = await player.getTestData();
	ctx.body = data;
});

router.get('/channels/:skip/:total', async function(ctx, next) {
	var data = await player.getChannels(ctx.params);
	ctx.body = data;
});

router.get('/higgstv/channels/:skip/:total', async function(ctx, next) {
  let {skip, total} = ctx.params;
	let limit = 50;
	let remainder = total % limit;
	let cnt = (remainder > 0) ? parseInt(total/limit)+1 : parseInt(total/limit);
	let ChannelList = [];
	//console.log('remainder:' + remainder);
	//console.log('cnt:' + cnt);

	for (var idx = 0; idx < cnt; idx++) {
		let startpoint = idx*50+1;
		let results = await player.getDynamicChannels(startpoint);
		if( idx == (cnt-1)){
  		if( remainder == 0){
  			ChannelList = ChannelList.concat(JSON.parse(results).channels);
  			console.log('[' + idx + ']ChannelList:' + ChannelList.length);
  		}
  		else{
  			let cut = JSON.parse(results).channels.slice(0, remainder);
  			ChannelList = ChannelList.concat(cut);
  			console.log('[cut][' + idx + ']ChannelList:' + ChannelList.length);
  		}
		}
		else{
			ChannelList = ChannelList.concat(JSON.parse(results).channels);
			//console.log('[' + idx + ']ChannelList:' + ChannelList.length);
		}
	}
	console.log('done.')
	ctx.body = ChannelList;
});

router.get('/channel/:id', async function(ctx, next) {
	var data = await player.getVideo(ctx.params);
	ctx.body = data;
});
