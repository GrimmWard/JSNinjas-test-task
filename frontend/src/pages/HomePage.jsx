import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllHeroes } from "../api/superheroes";
import {BASE_URL} from "../api/config.js";

export default function HomePage() {
    const [heroes, setHeroes] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchHeroes = async (pageNum = 1) => {
        setLoading(true);
        try {
            const data = await getAllHeroes(pageNum);
            setHeroes(data.heroes || []);
            setTotalPages(data.totalPages || 1);
        } catch (err) {
            setError(err.message || "Error fetching heroes");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHeroes(page);
    }, [page]);

    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: "2rem", fontSize: "1.2rem" }}>
                Loading superheroes...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>
                {error}
            </div>
        );
    }

    return (
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
            <h1 style={{ textAlign: "center", marginBottom: "2rem", fontSize: "2rem" }}>
                All Superheroes
            </h1>

            {heroes.length === 0 ? (
                <p style={{ textAlign: "center" }}>No heroes found.</p>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                        gap: "1.5rem",
                    }}
                >
                    {heroes.map((hero) => (
                        <div
                            key={hero._id}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "12px",
                                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                                overflow: "hidden",
                                backgroundColor: "#fff",
                                transition: "transform 0.2s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                        >
                            {hero.images && hero.images[0] ? (
                                <img
                                    src={`${BASE_URL}/${hero.images[0].replace(/\\/g, "/")}`}
                                    alt={hero.nickname}
                                    style={{
                                        width: "100%",
                                        height: "200px",
                                        objectFit: "cover",
                                    }}
                                />
                            ) : (
                                <div
                                    style={{
                                        width: "100%",
                                        height: "200px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        background: "#f0f0f0",
                                        color: "#666",
                                    }}
                                >
                                    No Image
                                </div>
                            )}

                            <div style={{ padding: "1rem", textAlign: "center" }}>
                                <h2 style={{ margin: "0 0 0.5rem 0" }}>{hero.nickname}</h2>
                                <Link
                                    to={`/superheroes/${hero._id}`}
                                    style={{
                                        display: "inline-block",
                                        marginTop: "0.5rem",
                                        padding: "0.5rem 1rem",
                                        background: "#007bff",
                                        color: "#fff",
                                        borderRadius: "8px",
                                        textDecoration: "none",
                                        transition: "background 0.3s",
                                    }}
                                    onMouseEnter={(e) =>
                                        (e.currentTarget.style.background = "#0056b3")
                                    }
                                    onMouseLeave={(e) =>
                                        (e.currentTarget.style.background = "#007bff")
                                    }
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}


            <div
                style={{
                    marginTop: "2rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem",
                }}
            >
                <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    style={{
                        padding: "0.5rem 1rem",
                        borderRadius: "6px",
                        border: "none",
                        background: page === 1 ? "#ccc" : "#007bff",
                        color: "#fff",
                        cursor: page === 1 ? "not-allowed" : "pointer",
                    }}
                >
                    Prev
                </button>
                <span style={{ fontSize: "1.1rem" }}>
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    style={{
                        padding: "0.5rem 1rem",
                        borderRadius: "6px",
                        border: "none",
                        background: page === totalPages ? "#ccc" : "#007bff",
                        color: "#fff",
                        cursor: page === totalPages ? "not-allowed" : "pointer",
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
