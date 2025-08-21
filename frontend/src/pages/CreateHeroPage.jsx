import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;


export default function CreateHeroPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nickname: "",
        real_name: "",
        origin_description: "",
        superpowers: "",
        catch_phrase: "",
    });
    const [images, setImages] = useState([]);
    const [preview, setPreview] = useState([]); // для відображення

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setImages((prev) => [...prev, ...files]);

        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setPreview((prev) => [...prev, ...newPreviews]);
    };

    const removeImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
        setPreview((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();
            Object.keys(formData).forEach((key) => data.append(key, formData[key]));
            images.forEach((img) => data.append("images", img));

            await axios.post(`${API_URL}/create`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Героя створено успішно!");
            navigate("/");
        } catch (err) {
            console.error(err);
            alert("Помилка при створенні героя!");
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h2 style={{ marginBottom: "20px", fontSize: "24px" }}>Add new Hero</h2>
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    marginLeft: "10px",
                }}
            >
                <input
                    type="text"
                    name="nickname"
                    placeholder="Nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    required
                    style={{
                        fontSize: "16px",
                        padding: "10px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                    }}
                />
                <input
                    type="text"
                    name="real_name"
                    placeholder="Real Name"
                    value={formData.real_name}
                    onChange={handleChange}
                    style={{
                        fontSize: "16px",
                        padding: "10px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                    }}
                />
                <textarea
                    name="origin_description"
                    placeholder="Origin Description"
                    value={formData.origin_description}
                    onChange={handleChange}
                    style={{
                        fontSize: "16px",
                        padding: "10px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        minHeight: "80px",
                    }}
                />
                <textarea
                    name="superpowers"
                    placeholder="Superpowers"
                    value={formData.superpowers}
                    onChange={handleChange}
                    style={{
                        fontSize: "16px",
                        padding: "10px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        minHeight: "80px",
                    }}
                />
                <input
                    type="text"
                    name="catch_phrase"
                    placeholder="Catch Phrase"
                    value={formData.catch_phrase}
                    onChange={handleChange}
                    style={{
                        fontSize: "16px",
                        padding: "10px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                    }}
                />

                <div>
                    <label
                        style={{ fontSize: "16px", marginBottom: "8px", display: "block" }}
                    >
                        Images:
                    </label>
                    <input type="file" multiple onChange={handleFileChange}  />
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap",
                        marginTop: "10px",
                    }}
                >
                    {preview.map((src, i) => (
                        <div
                            key={i}
                            style={{
                                position: "relative",
                                display: "inline-block",
                            }}
                        >
                            <img
                                src={src}
                                alt="preview"
                                style={{
                                    width: "100px",
                                    height: "150px",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                    border: "1px solid #ccc",
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(i)}
                                style={{
                                    position: "absolute",
                                    top: "-5px",
                                    right: "-5px",
                                    background: "red",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "50%",
                                    width: "20px",
                                    height: "20px",
                                    cursor: "pointer",
                                }}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    style={{
                        marginTop: "20px",
                        padding: "12px",
                        fontSize: "16px",
                        borderRadius: "6px",
                        border: "none",
                        background: "#007bff",
                        color: "#fff",
                        cursor: "pointer",
                    }}
                >
                    Створити
                </button>
            </form>
        </div>
    );
}