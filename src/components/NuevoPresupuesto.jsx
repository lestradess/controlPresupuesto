import { useState } from 'react'
import Mensaje from './Mensaje';
import { formatearCantidad } from '../helpers';



const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidPresupuesto }) => {
    const [ mensaje, setMensaje ] = useState('');

    const handlePresupuesto = (e) => {
        e.preventDefault();

        if (!presupuesto || presupuesto < 0) {
            setMensaje('No es un presupuesto válido');
            return;
        } 
        setMensaje('');
        setIsValidPresupuesto(true);

    }
    return (
        <div className='contenedor-presupuesto contenedor sombra '>
            <form onSubmit={ handlePresupuesto } className='formulario'>
                <div  className='campo'>
                    <label >Definir Presupuestos</label>
                    <input
                        type="number"
                        className='nuevo-presupuesto'
                        placeholder='Añade tu Presupuesto'
                        value={ presupuesto }
                        onChange={ (e) => setPresupuesto(Number(e.target.value)) }
                    />
                    <input type="submit" value="Añadir" />
                </div>
                { mensaje && <Mensaje tipo='error'>{ mensaje }</Mensaje> }
            </form>
        </div>
    )
}

export default NuevoPresupuesto