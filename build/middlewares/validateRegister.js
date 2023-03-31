"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = void 0;
const express_1 = require("express");
// const validateRegiste2 = (error: ErrorRequestHandler, req =request, res= response, next: NextFunction) =>{
// }
const validateRegister = (schema) => (req = express_1.request, res = express_1.response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        yield schema.validate(body);
        return next();
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
exports.validateRegister = validateRegister;
