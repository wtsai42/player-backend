const Koa = require('koa');
const path = require('path');
const logger = require('koa-logger');
const convert = require('koa-convert');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const cors = require('koa2-cors');
const index = require('./routes/index');
const apis = require('./routes/apis');
const config = require('config');

const app = new Koa();
const router = new Router();

router.use('/', index.routes(), index.allowedMethods());
router.use('/apis', apis.routes(), apis.allowedMethods());

app.use(convert(logger()))
   .use(convert(bodyParser()))
   .use(convert(koaStatic(path.join(__dirname, 'public'), { hidden: true })))
   .use(cors({
	   origin: function (ctx) {
				// 允许来自所有域名请求
				ctx.set("Access-Control-Allow-Origin", "*");
		   }
	 }))
   .use(router.routes())
   .use(router.allowedMethods())


app.listen(config.server.port, () => {
	console.log('Listening on port ' + config.server.port + '.')
});
