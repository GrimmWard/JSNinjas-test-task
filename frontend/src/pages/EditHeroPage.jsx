import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {deleteHero, getHeroById, updateHero} from "../api/superheroes.js";
import {BASE_URL} from "../api/config.js";


export default function EditHeroPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [hero, setHero] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newImages, setNewImages] = useState([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const res = await getHeroById(id);
                setHero(res);
            } catch (err) {
                setError(err.message || "Error fetching hero");
            } finally {
                setLoading(false);
            }
        };
        fetchHero();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!hero) return <p>Hero not found</p>;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHero({ ...hero, [name]: value });
    };

    const handleAddImages = (e) => {
        const filesArray = Array.from(e.target.files);
        const filesWithPreview = filesArray.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));
        setNewImages(prev => [...prev, ...filesWithPreview]);
    };

    const handleDeleteNewImage = (previewUrl) => {
        setNewImages(prev => prev.filter(img => img.preview !== previewUrl));
    };

    const handleDeleteOldImage = (imageName) => {
        if (!window.confirm("Are you sure?")) return;

        setHero(prev => {
            const updatedImages = prev.images.filter(img => img !== imageName);
            if (updatedImages.length + newImages.length === 0) {
                alert("At least one image is required");
                return prev;
            }
            return { ...prev, images: updatedImages };
        });
    };

    const handleDeleteHero = async () => {
        if (!window.confirm("Is it accurate to delete a character?")) return;
        try {
            await deleteHero(id);
            navigate("/");
        } catch (err) {
            alert(err.message || "Error deleting hero");
        }
    };

    const isValidText = (text) => {
        return /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ\s]+$/.test(text);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            if (hero.images.length + newImages.length === 0) {
                alert("At least one image is required");
                return;
            }

            if (
                !isValidText(hero.nickname) ||
                !isValidText(hero.real_name) ||
                (hero.catch_phrase && !isValidText(hero.catch_phrase)) ||
                (hero.superpowers && !isValidText(hero.superpowers))
            ) {
                alert("Text fields can contain only letters and spaces!");
                return;
            }



            const formData = new FormData();
            formData.append("nickname", hero.nickname);
            formData.append("real_name", hero.real_name);
            formData.append("origin_description", hero.origin_description || "");
            formData.append("catch_phrase", hero.catch_phrase || "");
            formData.append("superpowers", hero.superpowers);


            hero.images.forEach(img => formData.append("existingImages", img));


            newImages.forEach(imgObj => formData.append("images", imgObj.file));

            const res = await updateHero(id, formData);

            setHero(res);
            setNewImages([]);
            alert("Hero updated successfully!");
        } catch (err) {
            alert(err.response?.data?.message || err.message || "Error updating hero");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "1rem" }}>
            <h1 style={{ textAlign: "center" }}>Edit Hero: {hero.nickname}</h1>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <label>
                    Nickname:
                    <input name="nickname" value={hero.nickname} onChange={handleChange} style={{ width: "100%", padding: "0.5rem", fontSize: "1rem", borderRadius: "6px" }} />
                </label>

                <label>
                    Real Name:
                    <input name="real_name" value={hero.real_name} onChange={handleChange} style={{ width: "100%", padding: "0.5rem", fontSize: "1rem", borderRadius: "6px" }} />
                </label>

                <label>
                    Origin Description:
                    <textarea name="origin_description" value={hero.origin_description || ""} onChange={handleChange} style={{ width: "100%", padding: "0.5rem", fontSize: "1rem", borderRadius: "6px" }} />
                </label>

                <label>
                    Catch Phrase:
                    <input name="catch_phrase" value={hero.catch_phrase || ""} onChange={handleChange} style={{ width: "100%", padding: "0.5rem", fontSize: "1rem", borderRadius: "6px" }} />
                </label>

                <label>
                    Superpowers:
                    <input name="superpowers" value={hero.superpowers || ""} onChange={handleChange} style={{ width: "100%", padding: "0.5rem", fontSize: "1rem", borderRadius: "6px" }} />
                </label>
            </div>

            <hr style={{ margin: "2rem 0" }} />

            <h2>Images</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
                {hero.images.map((img, idx) => (
                    <div key={idx} style={{ position: "relative" }}>
                        <img src={`${BASE_URL}/${img.replace(/\\/g, "/")}`} alt={`${hero.nickname} ${idx}`} width={150} style={{ borderRadius: "6px", objectFit: "cover" }} />
                        <button
                            onClick={() => handleDeleteOldImage(img)}
                            style={{ position: "absolute", top: 0, right: 0, background: "red", color: "#fff", border: "none", borderRadius: "50%", width: "24px", height: "24px", cursor: "pointer" }}>
                            ×
                        </button>
                    </div>
                ))}

                {newImages.map((imgObj, idx) => (
                    <div key={`new-${idx}`} style={{ position: "relative" }}>
                        <img src={imgObj.preview} alt={`new-${idx}`} width={150} style={{ borderRadius: "6px", objectFit: "cover" }} />
                        <button
                            onClick={() => handleDeleteNewImage(imgObj.preview)}
                            style={{ position: "absolute", top: 0, right: 0, background: "orange", color: "#fff", border: "none", borderRadius: "50%", width: "24px", height: "24px", cursor: "pointer" }}>
                            ×
                        </button>
                    </div>
                ))}
            </div>

            <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
                <input type="file" multiple onChange={handleAddImages} />
                <button onClick={handleSave} disabled={saving} style={{ padding: "0.5rem 1rem", fontSize: "1rem", borderRadius: "6px", background: "#4caf50", color: "#fff", cursor: "pointer" }}>
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>

            <button onClick={handleDeleteHero} style={{ padding: "0.5rem 1rem", fontSize: "1rem", borderRadius: "6px", background: "red", color: "#fff", cursor: "pointer" }}>
                Delete Hero
            </button>
        </div>
    );
}
