import { Routes, Route, Link } from "react-router";
import HomePage from "./pages/HomePage";
import SuperheroPage from "./pages/SuperheroPage";
import CreateHeroPage from "./pages/CreateHeroPage.jsx";
import EditHeroPage from "./pages/EditHeroPage";

function App() {
    return (
        <div>
            <nav style={{ padding: "1rem", background: "#eee" }}>
                <Link to="/">Home</Link> |{" "}
                <Link to="/create">Create Hero</Link>
            </nav>

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/superheroes/:id" element={<SuperheroPage />} />
                <Route path="/create" element={<CreateHeroPage />} />
                <Route path="/edit/:id" element={<EditHeroPage />} />
            </Routes>
        </div>
    );
}

export default App;
