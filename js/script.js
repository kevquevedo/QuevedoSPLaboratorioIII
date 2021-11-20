var listaDeClientes = [];
var idCliente;

function $(id) {
    return document.getElementById(id);
}

//Asocio los eventos.
window.addEventListener("load",()=>{

    Formulario.CargarClientes();

    //Boton Agregar
    $("btnAgregar").addEventListener("click",()=>{ 
        Formulario.AgregarCliente();
    })

    //Boton Eliminar
    $("btnEliminar").addEventListener("click",()=>{
        Formulario.EliminarCliente();
    }) 

    //Boton Limpiar
    $("btnLimpiar").addEventListener("click",()=>{
        Formulario.LimpiarLista();
    }) 

    //Boton Promedio
    $("btnPromedio").addEventListener("click",()=>{

        let promise = Formulario.CalcularPromedioEdad();
        promise.then(respuesta=>{

            $("txtPromedio").value = parseFloat(respuesta.toString()).toFixed(2);

        }).catch(f=>{
            console.log("Error");
        })
    }) 

    //Boton Filtrar
    $("btnFiltrar").addEventListener("click",()=>{

        sexo = $("sel_sexoFiltro").value;
        let promise = Formulario.FiltrarListaPorSexo(sexo);
        promise.then(respuesta=>{

            Formulario.ArmarTablaClientes(respuesta);

        }).catch(f=>{
            console.log("Error");
        })
    }) 


})

