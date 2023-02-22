import { useEffect, useState } from 'react'
import { formatearCantidad } from '../helpers'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const ControlPresupuesto = ({ presupuesto, gastos }) => {
    const [ porcentaje, setPorcentaje ] = useState(0);
    const [ disponible, setDisponible ] = useState(0);
    const [ gastado, setGastado ] = useState(0);

    useEffect(() => {
        //reduce va haciendo una operación con todos los valores de un array
        //se le pasa con función flecha la cantidad a sumar del array deseado
        // el total acumulado y la cantidad inicial.
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
        const totalDisponible = presupuesto - totalGastado;
        //Calcular el porncentaje gastado
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(0);

        setGastado(totalGastado);
        setDisponible(totalDisponible);
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje);
        }, 1000);
    }, [ gastos ]);


    return (
        <div className='contenedor-presupuesto contenedor sombra dos-colunmas'>
            <div>
                <CircularProgressbar
                    styles={ buildStyles({
                        pathColor: '#3b82f6',
                        trailColor: '#f5f5f5',
                        texcolor: '#3b82f6'
                    }) }
                    value={ porcentaje }
                    text={ `${ porcentaje } % Gastado` }
                />
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