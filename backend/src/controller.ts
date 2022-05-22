import { Request, Response, Router } from 'express';
import { getConnection } from "typeorm";
import { mintNft } from './service';
import { createClient } from 'redis';
import * as nearAPI from "near-api-js";
const fs = require("fs");
import axios, { AxiosResponse } from 'axios';
import { FilterBy } from '@redis/client/dist/lib/commands/COMMAND_LIST';

/*
 Start redis:
    docker run --name some-redis -d redis redis-server --save 60 1 --loglevel warning
*/

const { connect } = nearAPI;

var port = 8080;
var host = "127.0.0.1";
var password = null;
const rpcendpoint = "https://rpc.testnet.near.org";

var redis = require("redis"),
    client = redis.createClient(port, host);

// if there is a password do the auth
if (password !== null){
  client.auth(password);
}

const router = Router();


router.get('/progress', async (req: Request, res: Response) => {
    // TODO: Get the profile's current progress.
    await client.connect();
    const val = await client.get('votes');
    const value = Number(val)
    await client.quit();
    return res.status(200).json({votes : value});
});


router.get('/account', async (req: Request, res: Response) => {
    // TODO: Get the profile's associated NEAR account address.
    return res.status(200).json({});
});


router.get('/tokens', async (req: Request, res: Response) => {
    // TODO: Get any tokens belonging to the profile's NEAR account.
    // const { KeyPair, keyStores } = require("near-api-js");
  let reso = await axios.get('https://testnet-api.kitwallet.app/account/blu3hackteam-test.testnet/activity')
  .catch(function (error) {
    console.log(error);
  });

  let ress = reso
  console.log(reso)
  const aa = reso.map(a => )

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