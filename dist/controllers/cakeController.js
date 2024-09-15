"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCake = exports.createCake = exports.getCake = exports.getCakes = void 0;
let cakes = [
    {
        id: 1,
        name: "Chocolate Cake",
        comment: "Rich and delicious chocolate cake",
        imageUrl: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1043451_11-4713959.jpg?quality=90&webp=true&resize=440,400",
        yumFactor: 5,
    },
];
const getCakes = (req, res) => {
    res.json(cakes);
};
exports.getCakes = getCakes;
const getCake = (req, res) => {
    const id = parseInt(req.params.id);
    const cake = cakes.find((c) => c.id === id);
    if (cake) {
        res.json(cake);
    }
    else {
        res.status(404).json({ message: "Cake not found" });
    }
};
exports.getCake = getCake;
const createCake = (req, res) => {
    const { name, comment, imageUrl, yumFactor } = req.body;
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
    const newCake = {
        id: cakes.length + 1,
        name,
        comment,
        imageUrl,
        yumFactor,
    };
    cakes.push(newCake);
    res.status(201).json(newCake);
};
exports.createCake = createCake;
const deleteCake = (req, res) => {
    const id = parseInt(req.params.id);
    const index = cakes.findIndex((c) => c.id === id);
    if (index !== -1) {
        cakes.splice(index, 1);
        res.json({ message: "Cake deleted successfully" });
    }
    else {
        res.status(404).json({ message: "Cake not found" });
    }
};
exports.deleteCake = deleteCake;
