import { Link } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3003"

const ListadoPropuestasAdmin = ({ data, refreshData }) => {
    const handleToggleStatus = (proposal) => {
        const updateFetch = async ()=> {
            const proposalid = proposal._id
            const newStatus = proposal.activo === false ? true : false
            console.log(proposalid, newStatus)
            try {
            const response = await fetch (`${apiUrl}/API/proposals/${proposalid}`, {
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify({ activo: newStatus }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                refreshData();
            } else {
                console.error('Error al actualizar el estado de la propuesta');
            }} catch (error) {
                console.error('Error actualizando el estado:', error)
            }
        }
        updateFetch()
    }

    const handleDeleteProposal = (proposalId) => {
        const deleteFetch = async () => {
            try {
                const respone = await fetch(`${apiUrl}/API/proposals/${proposalId}`, {
                    method: 'DELETE',
                    credentials: 'include'
                });
                if (respone.ok) {refreshData();
                } else {
                    console.error('Error al eliminar la propuesta');
                }
            } catch (error) {
                console.error('Error eliminando la propuesta:', error);
            }
        };
        deleteFetch();
    };


    return (
        <div style={{ padding: '20px' }}> 
            <h2>Listado de Propuestas</h2>
            <ul className="listadoPropuestas" style={{listStyle:"none"}}>
                {data.map((proposal) => ( 
                    <li key={proposal._id} style={{ display:"flex", flexDirection:"row", justifyContent:"space-around",border: '1px solid #ccc',gap:'50px', padding: '10px', marginBottom: '10px' }}>
                        <h3><Link className="link" to={`/admin/propuestas/${proposal._id}`}>{proposal.nombre} ({proposal.mes})</Link></h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-between' }}>
                        <p style={{borderRadius:'5px', backgroundColor: proposal.activo === true ? "#15ff0085" : "#ff37008f" }}>
                            {proposal.activo === true ? "Activada" : "Desactivada"}</p>
                        <button style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={() => handleToggleStatus(proposal)}> Cambiar</button>
                        <button style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}  onClick={() => handleDeleteProposal(proposal._id)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
            <h3> Crear una nueva propuesta</h3>
            <Link className="link" to="/admin/propuestas/nueva" style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Crear Propuesta</Link>
        </div>
    )
}

export default ListadoPropuestasAdmin;

