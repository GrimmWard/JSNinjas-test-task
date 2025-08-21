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
router.put('/edit/:id', upload.array("images"), async(req, res) => {
    try {
        const { nickname, real_name, origin_description, catch_phrase, superpowers, existingImages } = req.body;
        const hero = await Superhero.findById(req.params.id);
        if (!hero) return res.status(404).json({ message: "Superhero not found" });

        // Видаляємо картинки, яких більше немає
        const imagesToDelete = hero.images.filter(img => !existingImages.includes(img));
        imagesToDelete.forEach(imgPath => {
            fs.unlink(imgPath, err => { if(err) console.log(err); });
        });

        // Збираємо новий масив картинок
        let updatedImages = [...existingImages];
        if (req.files && req.files.length > 0) {
            updatedImages.push(...req.files.map(f => f.path));
        }

        // Оновлюємо
        hero.nickname = nickname;
        hero.real_name = real_name;
        hero.origin_description = origin_description;
        hero.catch_phrase = catch_phrase;
        hero.superpowers = superpowers;
        hero.images = updatedImages;

        await hero.save();
        res.json(hero);
    } catch(err) {
        res.status(500).json({message: err.message});
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