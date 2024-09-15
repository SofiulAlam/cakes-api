import { Request, Response } from "express";
import { Cake } from "../models/cake";

let cakes: Cake[] = [
  {
    id: 1,
    name: "Chocolate Cake",
    comment: "Rich and delicious chocolate cake",
    imageUrl: "http://localhost:3000/uploads/chocolate-cake.jpg",
    yumFactor: 5,
  },
];

export const getCakes = (req: Request, res: Response) => {
  res.json(cakes);
};

export const getCake = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const cake = cakes.find((c) => c.id === id);
  if (cake) {
    res.json(cake);
  } else {
    res.status(404).json({ message: "Cake not found" });
  }
};

export const createCake = (req: Request, res: Response) => {
  const { name, comment, yumFactor } = req.body;
  const imageUrl = req.file
    ? `http://localhost:3000/uploads/${req.file.filename}`
    : "";

  if (!name || !comment || !imageUrl || !yumFactor) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (name.length > 30) {
    return res
      .status(400)
      .json({ message: "Name must be 30 characters or less" });
  }
  if (comment.length > 200) {
    return res
      .status(400)
      .json({ message: "Comment must be 200 characters or less" });
  }
  if (yumFactor < 1 || yumFactor > 5) {
    return res
      .status(400)
      .json({ message: "Yum factor must be between 1 and 5" });
  }

  const newCake: Cake = {
    id: cakes.length + 1,
    name,
    comment,
    imageUrl,
    yumFactor: parseInt(yumFactor),
  };
  cakes.push(newCake);
  res.status(201).json(newCake);
};

export const deleteCake = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = cakes.findIndex((c) => c.id === id);
  if (index !== -1) {
    cakes.splice(index, 1);
    res.json({ message: "Cake deleted successfully" });
  } else {
    res.status(404).json({ message: "Cake not found" });
  }
};
