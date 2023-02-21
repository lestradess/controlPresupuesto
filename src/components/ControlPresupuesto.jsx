import { useEffect, useState } from 'react'
import { formatearCantidad } from '../helpers'



const ControlPresupuesto = ({ presupuesto, gastos }) => {

    const [ disponible, setDisponible ] = useState(0);
    const [ gastado, setGastado ] = useState(0);

    useEffect(() => {
        //reduce va haciendo una operación con todos los valores de un array
        //se le pasa con función flecha la cantidad a sumar del array deseado
        // el total acumulado y la cantidad inicial.
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
        setGastado(totalGastado);
        setDisponible(presupuesto-totalGastado);
    }, [ gastos ]);


    return (
        <div className='contenedor-presupuesto contenedor sombra dos-colunmas'>
            <div>
                <p>Gráfica aquí</p>
            </div>
            <div className='contenido-presupuesto'>
                <p>
                    <span>Presupuesto: </span> { formatearCantidad(presupuesto) }
                </p>
                <p>
                    <span>Disponible: </span> { formatearCantidad(disponible) }
                </p>
                <p>
                    <span>Gastado: </span> { formatearCantidad(gastado) }
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto