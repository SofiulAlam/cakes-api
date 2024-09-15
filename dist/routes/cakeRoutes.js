"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cakeController_1 = require("../controllers/cakeController");
const router = express_1.default.Router();
/**
 * @swagger
 * /api/cakes:
 *   get:
 *     summary: Get all cakes
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/", cakeController_1.getCakes);
/**
 * @swagger
 * /api/cakes/{id}:
 *   get:
 *     summary: Get a cake by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Cake not found
 */
router.get("/:id", cakeController_1.getCake);
/**
 * @swagger
 * /api/cakes:
 *   post:
 *     summary: Create a new cake
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cake'
 *     responses:
 *       201:
 *         description: Cake created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", cakeController_1.createCake);
/**
 * @swagger
 * /api/cakes/{id}:
 *   delete:
 *     summary: Delete a cake
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cake deleted successfully
 *       404:
 *         description: Cake not found
 */
router.delete("/:id", cakeController_1.deleteCake);
exports.default = router;
