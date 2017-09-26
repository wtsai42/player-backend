"use strict";

const Router = require('koa-router');
const PlayerDB = require('../lib/playerdb');
const router = module.exports = new Router();

const player = new PlayerDB();

router.get('/', function (ctx, next) {
  ctx.body = 'This a default response!';
});

router.get('/channel', async function(ctx, next) {
	var data = await player.getData();
	ctx.body = data;
});

router.get('/channel/:skipNum/:limitNum', async function(ctx, next) {
	var data = await player.getDataByLimit(ctx.params);
	ctx.body = data;
});

router.get('/video/:id', async function(ctx, next) {
	var data = await player.getVideo(ctx.params);
	ctx.body = data;
});
