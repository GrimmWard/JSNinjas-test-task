import express from "express";
import Superhero from "../models/superhero.model.js";
import upload from "../middleware/upload.js";

const router = express.Router()

router.get('/', async(req, res) => {
    try {
        const heroes = await Superhero.find();
        res.json(heroes);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
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
router.put('/edit/:id', async(req, res) => {
    try {
        const hero = await Superhero.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!hero) {
            return res.status(404).json({ message: "Superhero not found" });
        }
        res.json(hero);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
router.delete('/deleteHero/:id', async (req, res) => {
    try {
        const hero = await Superhero.findByIdAndDelete(req.params.id);
        if (!hero) {
            return res.status(404).json({ message: "Superhero not found" });
        }
        res.status(200).json({message: "Superhero deleted" });
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


export default router