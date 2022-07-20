import * as Koa from 'koa';
import * as jwt from 'jsonwebtoken';

import { validateAccount } from './db';
const jwtKey = 'DFGHJRTY@#$CV^&*(4567DFGHJKL'
const usernameOrPasswordError = 'Utilizator sau parolă gresită !';
const sessionExpired = 'Sesiunea a expirat !';

export async function login(ctx: Koa.Context) {
  // console.log("am ajuns la login");
  try {
    // console.log("ctx", ctx.request.body);
    const { user: user, password } = ctx.request.body;
    const validated = await validateAccount(ctx.request.body.user);
    if (validated)
      return ctx.body = { token: jwt.sign({ user, expiresIn: '2 days' }, jwtKey) };
    else ctx.throw(usernameOrPasswordError, 401);
  } catch (error) {
    ctx.throw(usernameOrPasswordError, 401);
  }
}

export async function verify(ctx: Koa.Context, next) {
  try {
    const token = <jwt.JwtPayload>jwt.verify(ctx.request.header.authorization, jwtKey);
    // const user = users.filter(e => e.user === token.user)[0];
    // if (ctx.request.body) ctx.request.body.user = user;
    await next();
  } catch (error) {
    ctx.throw(usernameOrPasswordError, 401);
  }

}
