import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [taskList, setTaskList] = useState([])
	const [usuarioAnterior, setUsuarioAnterior] = useState("")
	const [usuario, setUsuario] = useState("")

	function getTaskList() {
		fetch('https://playground.4geeks.com/todo/users/' + usuario, { method: "GET" }) //busca info en la url
			.then((response) => {
				if (response.status === 404) {
					if (confirm("El usuario " + usuario + " no extiste. ¿Quieres crearlo?")) {
						createUser()
					} else {
						setUsuario(usuarioAnterior)
					}
				}
				return response.json()

			}) 			// promete que si llega la info la guardo en un formato, en este caso json (no es una extensión, es formato de datos) para poder interpretarla y crear una clase
			.then((data) => Array.isArray(data.todos) ? setTaskList(data.todos) : console.log("No hay usuario"))  	//promete que si se formatea bien lo guarda en un espacio, en este caso data, y lo procesa, en ese caso, hace un console.log
			.catch() 			//si algo sale mal, avisa
	}

	function addTask(event) {
		if (event.key === "Enter") {

			fetch('https://playground.4geeks.com/todo/todos/' + usuario, {
				method: "POST",
				body: JSON.stringify({
					"label": event.target.value,
					"is_done": false
				}),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then((response) => {
					if (response.status === 201) {
						getTaskList()
					}

					return response.json()
				})
				.then()
				.catch()

			event.target.value = ""

		}

	}

	function deleteTask(id) {
		fetch('https://playground.4geeks.com/todo/todos/' + id, { method: "DELETE" })
			.then((response) => {
				if (response.status === 204) {
					getTaskList()
				}
			})
			.then()
			.catch()

	}

	function createUser() {
		fetch('https://playground.4geeks.com/todo/users/' + usuario, {
			method: "POST"
		})
			.then((response) => {
				if (response.status === 201) {
					getTaskList()
				}
				return response.json()
			})
			.then()
			.catch()
	}

	function changeUser(event) {
		if (event.key === "Enter") {
			setUsuarioAnterior(usuario)
			setUsuario(event.target.value === "" ? usuario : event.target.value.toLowerCase())
			event.target.value = ""

		}
	}

	function deleteUser(user) {
		fetch('https://playground.4geeks.com/todo/users/' + user, { method: "DELETE" })
			.then((response) => {
				if (confirm("¿Quieres borrar el usuario " + usuario + "?")) {
					if (response.status === 204) {
						setUsuario(usuarioAnterior)
					}
				}

			})
			.then()
			.catch()

	}

	useEffect(() => {
		//código que queremos que se ejecute al cargar el componente
		getTaskList()
	}, [usuario])

	return (
		<div id="taskList" className="d-flex flex-column text-center">
			<input type="text" className="rounded p-2 my-3 mx-auto" placeholder="Usuario" onKeyDown={changeUser} />
			<h1 className="mb-3">{usuario === "" ? "Escriba su usuario" : "Quehaceres de " + usuario + ":"}</h1>
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
			<button className={usuario === "" ? "btn btn-danger mx-auto hide" : "btn btn-danger mx-auto"} onClick={() => deleteUser(usuario)}>Eliminar usuario</button>
		</div>
	);
};

export default Home;