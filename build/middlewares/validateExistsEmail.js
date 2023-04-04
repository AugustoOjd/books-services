"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateExistsEmail = void 0;
const validateExistsEmail = (req, res, next) => {
    try {
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.validateExistsEmail = validateExistsEmail;
