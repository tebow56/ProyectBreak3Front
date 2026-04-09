import { useBasic } from "../context/basicContext";


const ModeloPerfil = () => {
    const { userData } = useBasic();
    return (
        <div>
            <h1>Perfil</h1>
            {userData && (
                <div>
                    <p><strong>Email:</strong> {userData.email}</p>
                </div>
            )}
        </div>
    );
}   

export default ModeloPerfil