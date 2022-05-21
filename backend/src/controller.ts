import { Request, Response, Router } from 'express';
import { getConnection } from "typeorm";
import { mintNft } from './service';


const router = Router();


router.get('/progress', async (req: Request, res: Response) => {
    // TODO: Get the profile's current progress.
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
    // TODO: Add one progress point to the profile.
    return res.status(200).json({});
});


router.get('/down-vote', async (req: Request, res: Response) => {
    // TODO: Subtract one progress point from the profile.
    return res.status(200).json({});
});


export = router;