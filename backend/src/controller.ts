import { Request, Response, Router } from 'express';
import { getConnection } from "typeorm";
import { mintNft } from './service';
import { createClient } from 'redis';

/*
 Start redis:
    docker run --name some-redis -d redis redis-server --save 60 1 --loglevel warning
*/

var port = 6379;
var host = "127.0.0.1";
var password = null;

var redis = require("redis");
var client = redis.createClient(port, host);

// if there is a password do the auth
if (password !== null){
  client.auth(password);
}

const router = Router();


router.get('/progress', async (req: Request, res: Response) => {
    // TODO: Get the profile's current progress.
    await client.connect();
    // const val = await client.get('votes');
    // const value = Number(val)
    // await client.quit();
    // return res.status(200).json({votes : value});
    return res.status(200).json({});

});


router.get('/account', async (req: Request, res: Response) => {
    // TODO: Get the profile's associated NEAR account address.
    return res.status(200).json({});
});


router.get('/tokens', async (req: Request, res: Response) => {
    // TODO: Get any tokens belonging to the profile's NEAR account.
    return res.status(200).json({});
});


router.get('/up-vote', async (req: Request, res: Response) => {
    // add vote to redis
    await client.connect();
    const val = await client.get('votes');
    const value = Number(val)
    await client.set('votes', (value ? value + 1 : 1));
    await client.quit();
    return res.status(200).json({votes : value});
});


router.get('/down-vote', async (req: Request, res: Response) => {
    // remove one vote from redis
    await client.connect();
    const val = await client.get('votes');
    const value = Number(val)
    await client.set('votes', (value && value != 0 ? value - 1 : 0));
    await client.quit();
    return res.status(200).json({votes : value});
});

export = router;