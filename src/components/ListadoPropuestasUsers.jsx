import { Link } from "react-router-dom";

const ListadoPropuestas = ({ data }) => {
    return (
        <div> 
            <h2>Listado de Propuestas</h2>
            <ul className="listadoPropuestas">
                {data.map((proposal) => ( 
                    <li key={proposal._id}>
                        <h3><Link to={`/propuestas/${proposal._id}`}>{proposal.nombre}</Link></h3>
                        <p>{proposal.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListadoPropuestas;

