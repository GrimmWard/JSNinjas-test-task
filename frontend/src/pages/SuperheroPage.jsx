import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHeroById } from "../api/superheroes";

export default function SuperheroPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [hero, setHero] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const data = await getHeroById(id);
                setHero(data);
            } catch (err) {
                setError(err.message || "Error fetching hero");
            } finally {
                setLoading(false);
            }
        };
        fetchHero();
    }, [id]);

    if (loading) return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading hero...</p>;
    if (error) return <p style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>{error}</p>;
    if (!hero) return <p style={{ textAlign: "center", marginTop: "2rem" }}>Hero not found</p>;

    return (
        <div style={{ maxWidth: "900px", margin: "2rem auto", padding: "1rem" }}>
            {/* Header */}
            <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "1rem" }}>
                {hero.nickname}
            </h1>

            {/* Images Gallery */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1rem",
                    justifyContent: "center",
                    marginBottom: "2rem",
                }}
            >
                {hero.images.map((img, index) => (
                    <img
                        key={index}
                        src={`http://localhost:3000/${img.replace(/\\/g, "/")}`}
                        alt={`${hero.nickname} ${index + 1}`}
                        style={{
                            width: "200px",
                            height: "250px",
                            objectFit: "cover",
                            borderRadius: "12px",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                            transition: "transform 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    />
                ))}
            </div>

            {/* Info Section */}
            <div
                style={{
                    background: "#f8f8f8",
                    padding: "1.5rem",
                    borderRadius: "12px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
                    fontSize: "1.1rem",
                    lineHeight: "1.6",
                }}
            >
                <p><strong>Real Name:</strong> {hero.real_name}</p>
                <p><strong>Origin:</strong> {hero.origin_description}</p>
                <p><strong>Catch Phrase:</strong> {hero.catch_phrase}</p>
                <p><strong>Superpowers:</strong> {hero.superpowers}</p>
            </div>

            {/* Edit Button */}
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <button
                    onClick={() => navigate(`/edit/${hero._id}`)}
                    style={{
                        padding: "0.75rem 1.5rem",
                        fontSize: "1.1rem",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "background 0.3s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
                >
                    Edit Hero
                </button>
            </div>
        </div>
    );
}
