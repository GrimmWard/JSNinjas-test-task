import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();

    const linkStyle = (path) => ({
        padding: "0.5rem 1rem",
        margin: "0 0.5rem",
        borderRadius: "6px",
        textDecoration: "none",
        fontWeight: "500",
        fontSize: "1.1rem",
        color: location.pathname === path ? "#fff" : "#ddd",
        background: location.pathname === path ? "#4a90e2" : "transparent",
        transition: "0.3s",
    });

    return (
        <nav
            style={{
                padding: "1rem 2rem",
                background: "#1e1e2f",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                position: "sticky",
                top: 0,
                zIndex: 1000,
                borderRadius: "0 0 12px 12px",
            }}
        >
            <Link to="/" style={linkStyle("/")}>
                Home
            </Link>
            <Link to="/create" style={linkStyle("/create")}>
                Create Hero
            </Link>
        </nav>
    );
}
