import * as process from "process";
import {Knex} from "knex";
import {createClient, RedisClientType} from "redis";
import {appendSqlLog} from "../utils";
require('dotenv').config()
export const knex: Knex = require('knex')({
    client: process.env.DB_CONNECTION,
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    },
    debug: true,
    log: {
        debug(message) {
            console.log(message.sql);
            appendSqlLog(message.sql)
        },
    }
});


export const getRedis = async (): Promise<RedisClientType> => {
    const redis: RedisClientType = createClient({
        socket: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT),
        },
        password: process.env.REDIS_PASSWORD,
    });

    redis.on('error', err => {
        // console.log('', err)
        throw err
    });

    await redis.connect()
    return redis
}