import { useBasic } from "../../context/basicContext";

const AdminHistorial = () => {
    const { user } = useBasic();
    return (
        <div>
            <h1>Historial</h1>
        </div>
    )
}

export default AdminHistorial