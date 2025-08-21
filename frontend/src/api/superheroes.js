
import {api} from "./config.js";


export const getAllHeroes = async (page = 1, limit = 5) => {
    const res = await api.get(`/superheroes?page=${page}&limit=${limit}`);
    return res.data;
};


export const getHeroById = async (id) => {
    const res = await api.get(`/superheroes/hero/${id}`);
    return res.data;
};


export const createHero = async (formData) => {
    const res = await api.post(`/superheroes/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return res.data;
};

export const updateHero = async (id, formData) => {
    const res = await api.put(`/superheroes/edit/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return res.data;
};

export const deleteHero = async (id) => {
    const res = await api.delete(`/superheroes/deleteHero/${id}`);
    return res.data;
};
