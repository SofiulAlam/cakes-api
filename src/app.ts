import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import cakeRoutes from "./routes/cakeRoutes";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cake Management API",
      version: "1.0.0",
      description: "API for managing delicious cakes",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/cakes", cakeRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
