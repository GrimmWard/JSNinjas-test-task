import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllHeroes = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

export const getHeroById = async (id) => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
};

export const createHero = async (heroData) => {
    const formData = new FormData();

    Object.keys(heroData).forEach((key) => {
        if (key === "images") {
            heroData.images.forEach((file) => formData.append("images", file));
        } else {
            formData.append(key, heroData[key]);
        }
    });

    const res = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
};