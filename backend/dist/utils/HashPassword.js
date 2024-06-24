"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswords = exports.hashPassword = void 0;
const bcrypt_1 = require("bcrypt");
async function hashPassword(password) {
    const hashedPassword = await (0, bcrypt_1.hash)(password, 10);
    return hashedPassword;
}
exports.hashPassword = hashPassword;
async function comparePasswords(password, hashedPassword) {
    return await (0, bcrypt_1.compare)(password, hashedPassword);
}
exports.comparePasswords = comparePasswords;
//# sourceMappingURL=HashPassword.js.map