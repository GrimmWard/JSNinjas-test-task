import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SuperheroPage from "./pages/SuperheroPage";
import CreateHeroPage from "./pages/CreateHeroPage.jsx";
import EditHeroPage from "./pages/EditHeroPage";
import Navbar from "./components/Navbar"; // 👈 підключаємо

function App() {
    return (
        <div>
            <Navbar />
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
