import { Link } from "react-router-dom";

const ListadoPropuestasAdmin = ({ data }) => {
    return (
        <div style={{ padding: '20px' }}> 
            <h2>Listado de Propuestas</h2>
            <ul className="listadoPropuestas" style={{listStyle:"none"}}>
                {data.map((proposal) => ( 
                    <li key={proposal._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                        <h3><Link to={`/admin/propuestas/${proposal._id}`}>{proposal.nombre}</Link></h3>
                        <p>{proposal.description}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-between' }}>
                        <p style={proposal.status === "false" ? { backgroundColor: "#15ff0085" } : { backgroundColor: "#ff37008f" }}>
                            {proposal.status === "false" ? "Aprobada" : "Pendiente"}</p>
                        <button style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={() => { }}> Cambiar</button>
                        <button style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}  onClick={() => { }}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListadoPropuestasAdmin;

