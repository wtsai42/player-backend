"use strict";

const Router = require('koa-router');
const router = module.exports = new Router();

router.get('/', async (ctx, next) => {
  await ctx.render('index.html');
});
