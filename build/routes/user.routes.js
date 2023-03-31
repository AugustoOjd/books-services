"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const validateRegister_1 = require("../middlewares/validateRegister");
const createUserValidation_1 = require("../validations/createUserValidation");
const router = (0, express_1.Router)();
router.post('', (0, validateRegister_1.validateRegister)(createUserValidation_1.userSchema), userController_1.regiterUser);
exports.default = router;
