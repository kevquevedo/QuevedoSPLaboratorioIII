class Formulario{
    
    //Función para optimizar el getElementById
    $(id) {
        return document.getElementById(id);
    }

        //CREA LA TABLA DE CLIENTES
    static ArmarTablaClientes(listaClientes)
    { 
        let existTabla = $("tabla");
        if(existTabla)
        {
            existTabla.parentNode.removeChild(existTabla);
        }
        existTabla = document.createElement("table");
        existTabla.setAttribute("id", "tabla");
        $("divTabla").appendChild(existTabla);

        listaClientes.forEach(cliente =>{
            let fila = document.createElement("tr");
            //ID
            let tdId = document.createElement("td");
            let txtId = document.createTextNode(cliente.id);
            fila.appendChild(tdId); tdId.appendChild(txtId);
            //Nombre
            let tdNombre = document.createElement("td");
            let txtNombre = document.createTextNode(cliente.nombre);
            fila.appendChild(tdNombre); tdNombre.appendChild(txtNombre);
            //Apellido
            let tdApellido = document.createElement("td");
            let txtApellido = document.createTextNode(cliente.apellido);
            fila.appendChild(tdApellido); tdApellido.appendChild(txtApellido);
            //Edad
            let tdEdad = document.createElement("td");
            let txtEdad = document.createTextNode(cliente.edad);
            fila.appendChild(tdEdad); tdEdad.appendChild(txtEdad);
            //Sexo
            let tdSexo = document.createElement("td");
            let txtSexo = document.createTextNode(cliente.p_sexo);
            fila.appendChild(tdSexo); tdSexo.appendChild(txtSexo);
            
            fila.setAttribute("idCliente", cliente.id.toString());
            fila.addEventListener("dblclick",Formulario.CargarDatosCliente);
            $("tabla").appendChild(fila);
        });
    }
    
    static async CargarClientes(){
        try 
        {
            Spinner.mostrarSpinner(true);
            let respuesta = await fetch("http://localhost:3001/clientes", {method:'GET', headers:{ 'Content-Type': 'application/json'}});
            if(respuesta.status == "200"){
                respuesta.json().then(elementos=>{ 
    
                    elementos.forEach(elemento =>{
                        let cliente = new Cliente(elemento.id, elemento.nombre, elemento.apellido, elemento.edad, elemento.sexo);
                        listaDeClientes.push(cliente);
                    })
                    Formulario.ArmarTablaClientes(listaDeClientes);
                    Spinner.mostrarSpinner(false);

                }).catch(error=>{
                    Spinner.mostrarSpinner(false);
                });    
            }
        }catch(error) {
            console.log("Fallo la función 'CargarClientes'. Con Error: " + error);
        }
    }

    //BUSCA el ultimo ID de cliente
    static BuscarUltimoID(){

        let resultado = listaDeClientes.reduce(function (inicio, cliente) { 
            console.log(cliente);
            if(inicio < cliente.id)
            {
                inicio = cliente.id + 1;
            }
            return inicio;
        },0)
        return resultado;
        
    }

   //Validan los nuevos datos cargados del Cliente.
   static ValidacionCliente(cliente)
   {
      
       let validarNombreCliente = true;
       let validarApellidoCliente = true;
       let validarEdadCliente = true;

       //Valida el tamaño del nombre.
       if(cliente.nombre.length <= 3)
       {
           $("txtNombre").style.borderColor="red";          
           validarNombreCliente = false;
       }
       
        //Valida el tamaño del apellido.
        if(cliente.apellido.length <= 3)
        {
            $("txtApellido").style.borderColor="red";          
            validarApellidoCliente = false;
        }

        //Valida edad del cliente.
        if(cliente.edad < 0 || cliente.edad > 140)
        {
            $("txtEdad").style.borderColor="red"; 
            validarEdadCliente = false;
        }


       return validarNombreCliente && validarApellidoCliente && validarEdadCliente;
   }

   //GENERA OBJETO CLIENTE DESDE FORMULARIO
    static GenerarObjetoDesdeForm()
    {
        let sexoCliente;
        if($("sel_sexo").value.toString() == "Masculino"){
            sexoCliente = "Male";
        }else{
            sexoCliente = "Female";
        }
        let id = Formulario.BuscarUltimoID(listaDeClientes);
        let nombre =  $("txtNombre").value.toString();
        let apellido =  $("txtApellido").value.toString();
        let edad = parseInt($("txtEdad").value.toString());
        let p_sexo = sexoCliente.toString();
        let cliente = new Cliente(id, nombre, apellido, edad, p_sexo);
        return cliente;
    }

    //MUESTRA LA VENTANA PARA MODIFICAR Y LE CARGA LOS DATOS DEL SELECCIONADO.
    static CargarDatosCliente(event)
    {
        let fila = event.target.parentNode; 
        let nombre = fila.childNodes[1].childNodes[0].nodeValue;
        let apellido = fila.childNodes[2].childNodes[0].nodeValue;
        let edad = fila.childNodes[3].childNodes[0].nodeValue;
        let sexo = fila.childNodes[4].childNodes[0].nodeValue;
        idCliente = fila.getAttribute("idCliente");
        let sexoCliente;
        if(sexo == "Female"){
            $("sel_sexo").value = "Femenino";
        }else{
            $("sel_sexo").value = "Masculino";
        }

        //Asigno las variables a la ventana.
        $("txtId").value = idCliente;
        $("txtNombre").value = nombre;
        $("txtApellido").value = apellido;
        $("txtEdad").value = edad;
       
    }


    static AgregarCliente(){
        let objeto = Formulario.GenerarObjetoDesdeForm();
        if(Formulario.ValidacionCliente(objeto))
        {
            listaDeClientes.push(objeto);
            Formulario.ArmarTablaClientes(listaDeClientes);
        }
    }

    //Busco un ID, si lo encuentro, lo devuelvo
    static ExisteID(idRecibido){
        let retorno = 0;
        listaDeClientes.forEach(cliente =>{
            if(cliente.id == idRecibido)
            {
                retorno = idRecibido;
            }  
        })
        return retorno;
    }

    //Elimina un cliente de la lista por ID.
    static EliminarCliente(){

        let idBuscado = Formulario.ExisteID($("txtId").value);
        if(idBuscado > 0){
            listaDeClientes = listaDeClientes.filter(function(cliente) {
                return cliente.id != idBuscado; 
            });
            Formulario.ArmarTablaClientes(listaDeClientes);
        }
    }

    //Limpia la lista de Clientes
    static LimpiarLista(){

        listaDeClientes.splice(0, listaDeClientes.length);
        Formulario.ArmarTablaClientes(listaDeClientes);
        //Asigno las variables a la ventana.
        $("txtId").value = "";
        $("txtNombre").value = "";
        $("txtApellido").value = "";
        $("txtEdad").value = "";
        $("sel_sexo").value = "Masculino";//Por defecto.
    }

    //Calcula el promedio de edad con Promesa.
    static CalcularPromedioEdad(){

        return new Promise((exito,error)=>{

            let totalEdad = listaDeClientes.reduce(function (inicio, cliente) { 
                return inicio + cliente.edad;
            },0)

            if(totalEdad > 0){
                let promedio = totalEdad / listaDeClientes.length;
                exito(promedio);
            }else{
                error("No se pudo obtener el promedio");
            }

        });
    }

    //Filtra la lista por Sexo.
    static FiltrarListaPorSexo(filtrado){

        return new Promise((exito,error)=>{

            if(filtrado == "Masculino" || filtrado == "Femenino")
            {
                let listaAuxiliar;
                if(filtrado == "Masculino"){
                    listaAuxiliar = listaDeClientes.filter(function(cliente) {
                        return cliente.p_sexo == "Male"; 
                    });
                    exito(listaAuxiliar);
                    //Formulario.ArmarTablaClientes(listaAuxiliar);
                }else{
                    listaAuxiliar = listaDeClientes.filter(function(cliente) {
                        return cliente.p_sexo == "Female"; 
                    });
                    exito(listaAuxiliar);
                    //Formulario.ArmarTablaClientes(listaAuxiliar);
                }
            }else{
                error("No se pudo obtener el promedio");
            }

        });


    }

}




