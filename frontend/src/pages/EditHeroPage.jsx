import { useParams } from "react-router";

export default function EditHeroPage() {
    const { id } = useParams();
    return <h1>Edit Superhero (id: {id})</h1>;
}