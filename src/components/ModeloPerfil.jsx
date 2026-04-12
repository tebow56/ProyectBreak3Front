import { useBasic } from "../context/basicContext";


const ModeloPerfil = () => {
    const { user } = useBasic();
    return (
        <div>
            <h1>Perfil</h1>
            {user && (
                <div>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            )}
        </div>
    );
}   

export default ModeloPerfil