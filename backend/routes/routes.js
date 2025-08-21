import express from "express";
import Superhero from "../models/superhero.model.js";
import upload from "../middleware/upload.js";
import path from "path";
import * as fs from "node:fs";

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const total = await Superhero.countDocuments();

        const heroes = await Superhero.find({}, "nickname images")
            .skip(skip)
            .limit(limit);

        res.json({
            page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            heroes,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.post('/create', upload.array("images"), async (req, res) => {
    try {
        const heroData = req.body;

        if (req.files && req.files.length > 0) {
            heroData.images = req.files.map(file => file.path);
        }

        const superhero = await Superhero.create(heroData);
        res.status(201).json(superhero);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/hero/:id', async(req, res) => {
    try {
        const hero = await Superhero.findById(req.params.id)
        res.json(hero);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


router.put('/edit/:id', upload.array("images"), async (req, res) => {
    try {
        const hero = await Superhero.findById(req.params.id);
        if (!hero) return res.status(404).json({ message: "Superhero not found" });

        const existingImages = Array.isArray(req.body.existingImages)
            ? req.body.existingImages
            : [req.body.existingImages].filter(Boolean); // якщо один елемент, робимо масив

        // Видалення старих картинок, яких немає в existingImages
        hero.images.forEach(img => {
            if (!existingImages.includes(img)) {
                const filePath = path.join("uploads", path.basename(img));
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }
        });

        const newImages = req.files ? req.files.map(f => f.path) : [];

        hero.nickname = req.body.nickname;
        hero.real_name = req.body.real_name;
        hero.origin_description = req.body.origin_description || "";
        hero.catch_phrase = req.body.catch_phrase || "";
        hero.superpowers = req.body.superpowers || "";
        hero.images = [...existingImages, ...newImages];

        if (hero.images.length === 0) {
            return res.status(400).json({ message: "At least one image is required" });
        }

        await hero.save();
        res.json(hero);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.delete('/deleteHero/:id', async (req, res) => {
    try {
        const hero = await Superhero.findById(req.params.id);

        if (!hero) {
            return res.status(404).json({ message: "Superhero not found" });
        }


        if (hero.images && hero.images.length > 0) {
            hero.images.forEach((imgPath) => {
                const fullPath = path.resolve(imgPath);
                fs.unlink(fullPath, (err) => {
                    if (err) {
                        console.error("Помилка при видаленні файлу:", err);
                    }
                });
            });
        }


        await Superhero.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Superhero and images deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Dev route
router.delete('/deleteAll', async (req, res) => {
    try {
        const heroes = await Superhero.find();


        heroes.forEach((hero) => {
            if (hero.images && hero.images.length > 0) {
                hero.images.forEach((imgPath) => {
                    const fullPath = path.resolve(imgPath);
                    fs.unlink(fullPath, (err) => {
                        if (err) {
                            console.error("Помилка при видаленні файлу:", err);
                        }
                    });
                });
            }
        });

        await Superhero.deleteMany({});

        res.status(200).json({ message: "All superheroes and images deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export default router