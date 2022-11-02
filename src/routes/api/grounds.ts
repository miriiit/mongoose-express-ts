import { Router, Response, NextFunction } from "express";
import { check, ValidationChain, validationResult } from "express-validator";

const router: Router = Router();

import { getGrounds, getGroundsByName, saveOrUpdateGround } from '../../controllers/ground.controller';
import auth from '../../middleware/auth';

router.get('/',
    [auth],
    getGrounds
);

router.route('/groundByName').get(getGroundsByName);

router.post("/",
    [
        check("name", "Gound Name is required").exists(),
        check("gameType", "Game Type is required").exists(),
        check("coordinates", "Coordinates is required").exists(),
    ],
    saveOrUpdateGround
);


export default router;


