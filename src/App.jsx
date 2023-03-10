import { useEffect, useState } from 'react'
import Header from './components/Header'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import { generarId } from './helpers';
import Modal from './components/Modal';
import ListadoGastos from './components/ListadoGastos';
// import Filtros from './components/Filtros';


function App () {
  const [ gastos, setGastos ] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')): []
  );
  const [ presupuesto, setPresupuesto ] = useState(
    Number(localStorage.getItem('presupuesto') ?? 0)
  );
  const [ isValidPresupuesto, setIsValidPresupuesto ] = useState(false);
  const [ modal, setModal ] = useState(false);
  const [ animarModal, setAnimarModal ] = useState(false);
  // const [filtro, setFiltro] = useState('');
  const [ gastoEditar, setGastoEditar ] = useState({});

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true)
      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }

  }, [ gastoEditar ]);

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [ presupuesto ]);

  useEffect(() => {
    const presupuestoLs = Number(localStorage.getItem('presupuesto', presupuesto ?? 0))
    if (presupuestoLs > 0) {
      setIsValidPresupuesto(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])

  }, [ gastos ]);
  // useEffect(() => {
  //   if(filtro){
  //     //Filtrar gastos por categoria
  //   }
    
  // }, [filtro]);

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});
    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  }
  const guardarGasto = gasto => {
    if (gasto.id) {
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState);
      setGastos(gastosActualizados);
    } else {
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([ ...gastos, gasto ]);
      setGastoEditar({});
    }

    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 800);
  }
  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id);
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
            {/* <Filtros 
            filtros={filtro}
            setFiltros={setFiltro}
            /> */}
            <ListadoGastos
              gastos={ gastos }
              setGastoEditar={ setGastoEditar }
              eliminarGasto={ eliminarGasto }
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
        setGastoEditar={ setGastoEditar }
      /> }
    </div>
  )
}

export default App
