import express from "express";
import multer from "multer";
import path from "path";
import {
  getCakes,
  getCake,
  createCake,
  deleteCake,
} from "../controllers/cakeController";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

/**
 * @swagger
 * /api/cakes:
 *   get:
 *     summary: Get all cakes
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/", getCakes);

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
router.get("/:id", getCake);

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
router.post("/", upload.single("image"), createCake);

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
router.delete("/:id", deleteCake);

export default router;
