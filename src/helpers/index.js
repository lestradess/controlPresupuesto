export const generarId = () => {
    const randon = Math.random().toString(36).substring(3);
    const fecha = Date.now().toString(36)
    return randon + fecha;
}
export const formatearFecha = fecha =>{
    const fechaNueva = new Date(fecha);
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    }
    return fechaNueva.toLocaleDateString('es-ES', opciones)
} 
export const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString('es-ES', {
        style: 'currency',
        currency: 'EUR'
    })
}