let clientes = []; // crea un array vacio (listas)
let ID = 1;

const form = document.querySelector(".form_cliente"); // Formulario
const nombreInput = document.querySelector("#nombre"); // Input
const apellidoInput = document.querySelector("#apellido"); // Input2
const taskList = document.querySelector("#taskList"); // Lista de li

// Muestra las tareas en el HTML
const renderClientes = () => {
    clienteList.innerHTML = ""; // Borrar toda la informacion del ul

    clientes.forEach((cliente) => {
        // Dinamico con el texto ingresado en el input
        const html = ` 
      
            <li data-id="${cliente.id}" class="clientes__item">     
                <p id="entrada" class="${cliente.completa && "done"}"> ${cliente.id}</p>       
                <p id="entrada" class="${cliente.completa && "done"}"> ${cliente.nombre}</p>
                <p id="entrada" class="${cliente.completa && "done"}">${cliente.apellido}</p>  
                <div>                                     
                    <i class="bx bx-check"></i>
                    <i class="bx bx-trash"></i>
                </div/                                   
            </li>
    `;
        clienteList.innerHTML += html;
    })
}


form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const nombre = (nombreInput.value.trim());
    const apellido = (apellidoInput.value.trim());

    let erroresValidacion = false;
    
    if(nombre.length < 1 || apellido.length < 1){
        erroresValidacion = true;
        const error = document.querySelector(".error")
        error.textContent = "No dejar campos vacios";

        setTimeout(() => {
            error.textContent = "";
        }, 4000); 
    } 

    if(!erroresValidacion){
       // console.log(txt_tarea);
        const cliente = {
            id: ID++, // nos da la cantidad de milisegundos desde 01/01/1970. Genero un numero unico
            nombre: nombre,
            apellido: apellido,
            completa: false,
        };

       clientes.push(cliente); // Agrego la tarea a la lista de tareas
    
    
        console.log(clientes);

       // Almaceno las tareas en el localStorage
        localStorage.setItem("clientes", JSON.stringify(clientes));
       // JSON.stringify(task) transforma un objeto JS  del tipo array
       // en un objeto JSON del tipo string

        // taskInput.value = ""; // limpiar el campo de la tarea (input)
        form.reset(); // limpiaria el formulario completo

        renderClientes();
    }
})


//Evento para el tachado

clienteList.addEventListener("click",(event) => {
    if (event.target.classList.contains("bx-check")){
        // console.log(event.target.closest("li"));
        //closest va a buscar el primer contenedor q coincida con li y lo va a traer.
        //Una vez identificado, lo guardo en una variable

        const id = event.target.closest("li").dataset.id;        
        //Hacemos esto porque tenemos un array con elementos y deseo encontrar 
        //el elemento al q hice click

        const cliente = clientes.find((cliente) => cliente.id == id);
        //en cada tarea va a buscar si el id es igual al elemento q se hizo click
        // console.log(task);

        //Vamoa a cambiar el estado de la atarea
        cliente.completa = !cliente.completa;
        console.log(cliente);

        renderClientes();

        //El problema de ejecutar un renderTasks() es q me carga la lista nuevamente

        event.target.closest("li").querySelector("p").classList.toggle("done");
        //de la tarea que hice el click, busca el contenedor que tiene el objeto li con el .closest("li")
        //a partir de ahi con el .querySelector("p") busca el primer párrafo "p"
        //y de la listade clases de ese párrafo, .classList hace un .toggle("done")
        //el .toggle("done") va a quitar o agregar la clase done. 

        //ESTO ES MÁS ÓPTIMO QUE RENDERIZAR TODA LA LISTA

        //Pero si recargo la página las tareas pasan a estar incompletas
        //porque el localStorage no se actualizo
        localStorage.setItem("clientes", JSON.stringify(clientes));
    };

    //BORRAR UNA TAREA

    if(event.target.classList.contains("bx-trash")){
        const id = event.target.closest("li").dataset.id;
        const clienteIndex = clientes.findIndex((cliente) => cliente.id == id);
        
        //splice es una función q me permite manipular en JS los arrays
        //puedo añadir, eliminar o reemplazar los elementos de un array en una 
        //posición específica
        //tasks.splice(taskIndex, 1);, le paso dos parámetros a la función
        //taskIndex es el q contiene el índice del elemento a manipular
        //1 indica la cantidad de elementos a eliminar en este caso
        clientes.splice(clienteIndex, 1);
        
        localStorage.setItem("clientes", JSON.stringify(clientes));
        event.target.closest("li").remove();
    }
});






// Recupero lo almacenado en localStorage
document.addEventListener("DOMContentLoaded", () => {
    clientes = JSON.parse(localStorage.getItem('clientes')) || [];

    renderClientes();
});
/*funcion para validar q solo ingrese letras*/
function soloLetras(event){
    var letra = event.keyCode;
   
    if((letra > 64 && letra < 91) || (letra > 96 && letra < 123) || 
        (letra === 8) || (letra === 32)){
        return true;
    }else{
        
;        return false;
    }
}