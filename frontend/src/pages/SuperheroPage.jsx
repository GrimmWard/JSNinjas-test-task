import { useParams } from "react-router";

export default function SuperheroPage() {
    const { id } = useParams();
    return <h1>Superhero details (id: {id})</h1>;
}