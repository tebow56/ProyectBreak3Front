
const ListadoPropuestas = ({ data }) => {
    return (
        <div> 
            <h2>Listado de Propuestas</h2>
            <ul>
                {data.map((proposal) => ( 
                    <li key={proposal.id}>
                        <h3>{proposal.nombre} {proposal.description}</h3>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListadoPropuestas;

