import fs = require("fs");

if (fs.existsSync("config.js"))
  fs.copyFileSync("config.js", "src/config.js");

import Koa = require("koa");
import serve = require("koa-static");
import koaBody = require("koa-bodyparser");
import cors = require("@koa/cors");
import router from './src/router';

const app = new Koa();

app
  .use(serve("public"))
  .use(koaBody())
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`http://localhost:${port}`));
