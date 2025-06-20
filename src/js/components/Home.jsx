import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [taskList, setTaskList] = useState([])

	function getTaskList() {
		fetch('https://playground.4geeks.com/todo/users/carloren', { method: "GET" }) //busca info en la url
			.then((response) => response.json()) 			// promete que si llega la info la guardo en un formato, en este caso json (no es una extensión, es formato de datos) para poder interpretarla y crear una clase
			.then((data) => setTaskList(data.todos))  	//promete que si se formatea bien lo guarda en un espacio, en este caso data, y lo procesa, en ese caso, hace un console.log
			.catch((error) => console.log(error)) 			//si algo sale mal, avisa
	}

	function addTask(event) {
		if (event.key === "Enter") {

			fetch('https://playground.4geeks.com/todo/todos/carloren', {
				method: "POST",
				body: JSON.stringify({
					"label": event.target.value,
					"is_done": false
				}),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(resp => {
					console.log(resp.ok); // Será true si la respuesta es exitosa
					console.log(resp.status); // El código de estado 201, 300, 400, etc.
					return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
				})
				.then(data => {
					// Aquí es donde debe comenzar tu código después de que finalice la búsqueda
					getTaskList()

					console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
				})
				.catch(error => {
					// Manejo de errores
					console.log(error);
				});


			event.target.value = ""


		}

	}

	function deleteTask(id) {
		fetch('https://playground.4geeks.com/todo/todos/' + id, { method: "DELETE" }).then().then(() => getTaskList()).catch(error => {
			// Manejo de errores
			console.log(error);
		});

	}
	useEffect(() => {
		//código que queremos que se ejecute al cargar el componente
		getTaskList()
	}, [])

	return (
		<div id="taskList" className="d-flex flex-column text-center">
			<h1>Mis quehaceres:</h1>
			<ul id="todo" className="shadow-lg border list-group border align-self-center m-0">
				<li className="border-0 border-bottom list-group-item align-self-center fs-5" style={{ width: "20em" }}><input type="text" className="w-100 px-0" placeholder="Añadir tarea" onKeyDown={addTask} /></li>

				{taskList.map((item) => (
					<li key={item.id} className="d-flex border-0 border-bottom list-group-item align-self-center row fs-5" style={{ width: "20em" }}>
						<p className="col-11 align-self-start m-0 px-0 text-start">{item.label}</p>
						<p className="col-1 align-self-end text-end m-0 hide">
							<button className="crossButton" onClick={() => deleteTask(item.id)}>×</button>
						</p>
					</li>
				))}
				<li className="d-flex border-0 list-group-item align-self-center row" style={{ width: "25em" }}>
					<p className="col-11 align-self-start m-0 px-0 text-start text-secondary" style={{ fontSize: "0.75em" }}>{taskList.length === 0 ? `No hay tareas. Escribe una y pulsa enter` : taskList.length === 1 ? `Tienes una tarea por hacer` : `Tienes ${taskList.length} tareas por hacer`}</p>
				</li>

			</ul>
			<p className="border border-dark rounded-bottom border-top-0 bg-secondary align-self-center mb-0" style={{ width: "24em", height: "5px", opacity: "0.2" }}></p>
			<p className="border border-dark rounded-bottom border-top-0 bg-secondary align-self-center" style={{ width: "23em", height: "5px", opacity: "0.4" }}></p>
		</div>
	);
};

export default Home;