import { login } from "./user";
import * as Router from 'koa-router';
import { query } from './db';

const router = new Router();
router.prefix('/api/');

router
  .post("/query", query)
  .post("/login", login);

export default router;
