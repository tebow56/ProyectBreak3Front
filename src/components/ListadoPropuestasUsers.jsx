import { Link } from "react-router-dom";

const ListadoPropuestasUsers = ({ data }) => {
    const newData = data.filter(proposal => proposal.activo === true)
    
    return (
        <div> 
            <h2>Listado de Propuestas</h2>
            <ul className="listadoPropuestas" style={{listStyle:"none"}}>
                {newData.map((proposal) => ( 
                    <li key={proposal._id}>
                        <h3><Link className="link" to={`/user/propuestas/${proposal._id}`}>{proposal.nombre}</Link></h3>
                        
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListadoPropuestasUsers;

