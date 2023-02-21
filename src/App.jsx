import { useEffect, useState } from 'react'
import Header from './components/Header'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import { generarId } from './helpers';
import Modal from './components/Modal';
import ListadoGastos from './components/ListadoGastos';






function App () {

  const [ presupuesto, setPresupuesto ] = useState('');
  const [ isValidPresupuesto, setIsValidPresupuesto ] = useState(false);
  const [ modal, setModal ] = useState(false);
  const [ animarModal, setAnimarModal ] = useState(false);
  const [ gastos, setGastos ] = useState([]);
  const [ gastoEditar, setGastoEditar ] = useState({});

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true) 
      setTimeout(() => {
        setAnimarModal(true);
      }, 500);    
    }
    
  }, [ gastoEditar ]);

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});
    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  }
  const guardarGasto = gasto => {
    if(gasto.id){
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto:gastoState);
      setGastos(gastosActualizados);
    }else{
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([ ...gastos, gasto ]);
    }
    
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 800);
  }
  const eliminarGasto = id=>{
    const gastosActualizados = gastos.filter(gasto=> gasto.id !== id);
    setGastos(gastosActualizados);
  }

  return (
    <div className={ modal ? 'fijar' : '' }>
      <Header
        gastos={ gastos }
        presupuesto={ presupuesto }
        setPresupuesto={ setPresupuesto }
        isValidPresupuesto={ isValidPresupuesto }
        setIsValidPresupuesto={ setIsValidPresupuesto }
      />
      { isValidPresupuesto && (
        <>
          <main>
            <ListadoGastos
              gastos={ gastos }
              setGastoEditar={ setGastoEditar }
              eliminarGasto={eliminarGasto}
            />
          </main>
          <div className='nuevo-gasto'>
            <img
              src={ IconoNuevoGasto }
              alt="Icono Nuevo Gasto"
              onClick={ handleNuevoGasto }
            />
          </div>
        </>
      ) }
      { modal && <Modal
        setModal={ setModal }
        animarModal={ animarModal }
        setAnimarModal={ setAnimarModal }
        guardarGasto={ guardarGasto }
        gastoEditar={ gastoEditar }
      /> }
    </div>
  )
}

export default App
