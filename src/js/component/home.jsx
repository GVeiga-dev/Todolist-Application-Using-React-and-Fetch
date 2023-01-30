import React, {useState, useEffect} from "react";

                           							// # APUNTES # //
//  # Los fetch hay que separarlos por funciones para ser mas ordenados. #
//  # El paso 3 # body: JSON.stringify([]) # Se utiliza cuando vamos a enviar informacion, en metodo "GET" no lo usamos. #
//  # Las arrow funtions ()=>{} #
//  # Funciones de declaracion normales. function(){} #
//  # [] // => Si "[]" esta vacio el codigo se va activar cuando se recargue la pagina. #

//create your first component

const Home = () => {

	const [tarea,setTarea] = useState("");
	const [list,setList] = useState([]);

	const deleteTarea = (indexItem) => {
		setList((prevState) =>
		  prevState.filter((listItems, index) => index !== indexItem)
		);
	  };
	  
	// FUNCION AGREGAR TAREA. //

	// Funcion de agregarTarea. (Agrega una tarea a la lista y actualiza el formulario.)
	function agregarTarea(e) {
		e.preventDefault() /* evita que la pagina se refresque cuando se envia el formulario */

		setList(list.concat({label: tarea, done: false}))
		setTarea("") /* establece el valor de Tarea en una cadena vacia.*/
	}

	// FUNCION CREAR USUARIO. //

	function crearUsuario(){
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/gatoconbotas`,
		{

	// # Paso 1 METODO # //
		method: 'POST', // 'GET, POST, PUT, DELETE, etc.' /* Hacemos una peticion de POST a la api */ Osea que vamos a crear el usuario "gatoconbotas" con el metodo POST.

	// # Paso 2 ENCABEZADO # // Es el tipo de informacion que le voy a enviar va a ser de tipo json.
		headers: {
			'Content-Type': 'application/json'
		},

	// # Paso 3 CUERPO # // (Donde vamos a tener la informacion que vamos a enviar).
		body: JSON.stringify([])
	  })

		.then((response)=>response.json())
		.then((data)=>console.log(data))
	}

	// FUNCION OBTENER LISTA. //	

	function obtenerLista(){
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/gatoconbotas`,
		{method: 'GET', 
		
	  })
		.then((response)=>response.json())
		.then((data)=>setList(data))
	}

	// FUNCION ACTUALIZAR LISTA. //

	function actualizar(){
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/gatoconbotas`,
		{method: 'PUT', 
		headers: {
			'Content-Type': 'application/json'},
		body: JSON.stringify(list)
	  })
		.then((response)=>response.json())
		.then((data)=>console.log(data))
	}
	// FUNCION ELIMINAR LISTA. //
	function deleteList(){
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/gatoconbotas`,
		{method: 'DELETE', 
		headers: {
			'Content-Type': 'application/json'}
	  })
		.then((response)=>response.json())
		.then((data)=>{
			console.log(data.result)
			if (data.result === "ok"){
				setList([])
			}
		})
		
	}

	// USEEFFECTS. //

	useEffect (()=>{
		crearUsuario();
		obtenerLista()
	},[])

	useEffect (()=>{
		actualizar()
		},[list])
		console.log(list)

	// RETORNO. //

	return (
		<>
		<div className="card container d-flex bg-light mt-3 md-w50">
		<h2 className="titulo m-auto p-2">Lista de tareas.</h2>
  			<div className="card-body">
  				<input type="text" className="input m-1 w-75" value={tarea} id="exampleInput" aria-describedby="inputHelp" onChange={(e)=>{setTarea(e.target.value)}} placeholder="Añadir una tarea."/>
				<button type="submit" className="btn btn-primary btn-sm" onClick={agregarTarea}>Agregar</button>
  			</div>
			<div className="to-do-list d-flex">
			  <ul>{list.map((item, index) => (<li key={index}>
          {item.label}
          <button className="btn" onClick={() => deleteTarea(index)}>
            <i className="fas fa-trash-alt" />
          </button>
        </li>
      ))}</ul>
			</div>
			<div className="delete-list d-flex justify-content-center mt-3 md-w50 mb-2">
			<button type="submit" className="btn btn-danger btn-sm" onClick={deleteList}>Delete list</button>
			</div>
		</div>
		
		</>
	);
};

export default Home;


// queda reparar un error en linea  36 y 69. REVISAR...