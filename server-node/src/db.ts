import * as Koa from 'koa';
import * as sql from 'mssql';
import config from './config';

import * as dayjs from "dayjs";
import * as ro from "dayjs/locale/ro"; // set locale to ro
import * as utc from "dayjs/plugin/utc";
import * as timezone from "dayjs/plugin/timezone"; // dependent on utc plugin
import queries from './queries';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ro");

const pool = new sql.ConnectionPool(config.db);
console.time('db connection');
pool
    .connect()
    .then(() => console.timeEnd('db connection'))
    .catch(dbConnError => console.error({ dbConnError, dbConnConfig: config.db }))

/**
 * Compune si executa un query cu parametrii
 * @param sql 
 * @param params 
 * @returns 
 */
export async function exec(pool: sql.ConnectionPool, sql: string, params?: { [key: string]: any }) {
    try {
        let request = await (await pool.connect()).request();
        for (let param in params) {
            let val = params[param];
            if (typeof val === 'string' && val.length <= 25 && val.match(/\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d.\d\d\dZ/)) {
                val = dayjs(val).tz('Europe/Bucharest').format('YYYY-MM-DDTHH:mm:ss');
            }
            request.input(param, val);
        }
        return await request.query(sql);
    } catch (err) {
        console.error({ sqlError: err.message || err, sql, params });
        throw err;
    }
}

/**
 * Verifică dacă combinația user & password este validă
 * @param account
 * @returns întoarce true sau excepție dacă contul nu este valid 
 */
export async function validateAccount(obj) {
    const conf = Object.assign(config.db);
    const pool = new sql.ConnectionPool(conf);
    console.log("validateaccount", obj.email, obj.password)
    try {
        var res = await exec(pool, queries["verifyUser"], { email: obj.email, parola: obj.password });
        console.log(res);
        if (res.recordset.length === 0) {
            return false;
        }
        else return true;
    } catch (err) {
        console.error(err);
        // ctx.status = 500;
        // ctx.body = "Internal Server Error";
        return false;
    }
}
export async function query(ctx: Koa.Context) {
    ctx.request.body.user = 'true';
    // if (!ctx.request.body && ctx.request.body.user) {
    //     return ctx.throw(401);
    // }
    console.log(ctx.request.body)
    const conf = Object.assign(config.db);
    const pool = new sql.ConnectionPool(conf);
    try {
        ctx.body = await exec(pool, queries[ctx.request.body.name], ctx.request.body.params);
    } catch (err) {
        console.error({
            query: queries[ctx.request.body.name],
            params: ctx.request.body.params,
            user: ctx.request.body.user
        });
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
}



