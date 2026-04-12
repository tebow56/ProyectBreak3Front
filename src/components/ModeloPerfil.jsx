import { useBasic } from "../context/basicContext";


const ModeloPerfil = () => {
    const { userData } = useBasic();
    return (
        <div>
            <h1>Perfil</h1>
            {userData && (
                <div>
                    <p><strong>Nombre:</strong> {userData.nombre}</p>
                    <p><strong>Apellidos:</strong> {userData.apellidos}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Farmacia:</strong> {userData.farmacia}</p>
                </div>
            )}
        </div>
    );
}   

export default ModeloPerfil