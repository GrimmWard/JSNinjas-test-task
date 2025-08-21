import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllHeroes = async (page = 1, limit = 5) => {
    const res = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
    return res.data; // повертає { page, totalPages, totalItems, heroes }
};

// Отримати одного героя по ID
export const getHeroById = async (id) => {
    const res = await axios.get(`${API_URL}/hero/${id}`);
    return res.data;
};

// Створити нового героя
export const createHero = async (formData) => {
    const res = await axios.post(`${API_URL}/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return res.data;
};

// Оновити текстові поля героя
export const updateHero = async (id, heroData) => {
    const res = await axios.put(`${API_URL}/edit/${id}`, heroData);
    return res.data;
};

// Видалити героя повністю
export const deleteHero = async (id) => {
    const res = await axios.delete(`${API_URL}/deleteHero/${id}`);
    return res.data;
};

// Додати картинки до героя
export const addHeroImages = async (id, formData) => {
    const res = await axios.put(`${API_URL}/edit/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return res.data;
};

// Видалити картинку героя
// Твій бекенд поки не має окремого маршруту для видалення окремої картинки.
// Можна робити PUT /edit/:id і передавати оновлений масив images.
export const deleteHeroImage = async (id, updatedImages) => {
    const res = await axios.put(`${API_URL}/edit/${id}`, { images: updatedImages });
    return res.data;
};