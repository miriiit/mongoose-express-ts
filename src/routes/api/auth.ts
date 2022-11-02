import { Router, Response } from "express";
import { check } from "express-validator";
import HttpStatusCodes from "http-status-codes";

import auth from "../../middleware/auth";
import Request from "../../types/Request";
import { User, IUser } from "../../models/user";
import { authenticateUser, findByUserEmail } from "../../controllers/auth.controller";

const router: Router = Router();

// @route   GET api/auth
// @desc    Get authenticated user given the token
// @access  Private
router.get("/userByEmail",
  [
    auth,
    check("email", "Please include a valid email").isEmail(),
  ],
  findByUserEmail
);

// @route   POST api/auth
// @desc    Login user and get token
// @access  Public
router.post("/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  authenticateUser
);

export default router;
