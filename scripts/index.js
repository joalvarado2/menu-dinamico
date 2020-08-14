const grid = new Muuri('.grid',{
    layout:{                            /* funcion para el algoritmo de la libreria Muuri */
        rounding: false
    }
})


window.addEventListener("load", () =>{
    grid.refreshItems().layout()     /* metodo aplicado a grid de la libreria */
    document.getElementById("grid").classList.add("imagenes-cargadas")

    // SE AGREGO LOS LISTENER DE LOS ENLACES PARA FILTRAR CATEGORIAS
const enlaces = document.querySelectorAll("#categorias a")
enlaces.forEach((e) => {
    e.addEventListener("click", (e) =>{
        e.preventDefault()

        enlaces.forEach((e) => e.classList.remove("activo"))
        e.target.classList.add("activo")

        const categoria = e.target.innerHTML.toLowerCase();
			categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`)

    })
})

// LISTENER PARA LA BARRA DE BUSQUEDA

document.querySelector("#barra-busqueda").addEventListener("input", (e) => {
    const busqueda = e.target.value
    grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda) );
})

// Agregamos listener para las imagenes
const overlay = document.getElementById('overlay');
document.querySelectorAll('.grid .item img').forEach((elemento) => {
    elemento.addEventListener('click', () => {
        const ruta = elemento.getAttribute('src');
        const descripcion = elemento.parentNode.parentNode.dataset.descripcion;

        overlay.classList.add('activo');
        document.querySelector('#overlay img').src = ruta;
        document.querySelector('#overlay .descripcion').innerHTML = descripcion;
    });
});

// Eventlistener del boton de cerrar
document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
    overlay.classList.remove('activo');
});

// Eventlistener del overlay
overlay.addEventListener('click', (evento) => {
    evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
});

})

