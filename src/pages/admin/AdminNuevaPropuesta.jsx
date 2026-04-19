
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3003"

const AdminNuevaPropuesta = ()  => {
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData(e.target);

        const response = await fetch(`${apiUrl}/API/proposals`, {
            method: 'POST',
            credentials: 'include',
            body: formData
        });
        if (response.ok) {
            alert("Propuesta creada con éxito");
        } else {
            alert("Error al crear la propuesta");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error de conexión");
    }
}


    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Nueva Propuesta</h1>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '500px', textAlign:'left' }} onSubmit={handleSubmit}>
                <label>
                    Nombre del laboratorio:
                    <input type="text" name="nombre" />
                </label>
                <label>
                    Mes:        
                    <input type="text" name="mes" />
                </label>
                <input type="file"  name="articulo" />
                <button type="submit" style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}   >Crear Propuesta</button>
            </form>
        </div>
    )
}

export default AdminNuevaPropuesta