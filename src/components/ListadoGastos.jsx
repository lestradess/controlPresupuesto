import React from 'react'
import Gasto from './Gasto'


const ListadoGastos = ({ gastos, setGastoEditar , eliminarGasto}) => {
    return (
        <div className='listado-gastos contenedor'>
            <h2>{ gastos.length ? 'Gastos' : 'Aún no hay gastos, sigue así.' }</h2>
            { gastos.map(gasto => (
                <Gasto
                    key={ gasto.id }
                    gasto={ gasto }
                    setGastoEditar={ setGastoEditar }
                    eliminarGasto={ eliminarGasto }
                />
            )) }
        </div>
    )
}

export default ListadoGastos