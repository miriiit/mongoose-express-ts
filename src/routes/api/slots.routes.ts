import { Router, Response, NextFunction } from "express";
import { check, ValidationChain, validationResult } from "express-validator";

const router: Router = Router();

import { addSlot } from '../../controllers/slots.controller';
import auth from '../../middleware/auth';

// router.get('/',
//     getGrounds
// );


router.post("/add",
    [
        check("groundName", "Gound Name is required").exists(),
        check("startDT", "Start Time is required").exists(),
        check("endDT", "Start Time is required").exists(),
        check("charges", "Charges is required").exists(),
    ],
    addSlot
);

export default router;


