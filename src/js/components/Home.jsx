import { React, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [taskList, setTaskList] = useState(["Limpiar", "Tender", "Cocinar"])

	function addTask(event) {
		if (event.key === "Enter") {

			setTaskList(taskList.concat(event.target.value))

			event.target.value = ""
		}

	}

	return (
		<div id="taskList" className="d-flex flex-column text-center">
			<h1>Mis quehaceres:</h1>
			<ul id="todo" className="shadow-lg border list-group border align-self-center m-0">
				<li className="border-0 border-bottom list-group-item align-self-center fs-5" style={{ width: "20em" }}><input type="text" className="w-100 px-0" placeholder="Añadir tarea" onKeyDown={addTask} /></li>

				{taskList.map((item, i) => (
					<li key={i} className="d-flex border-0 border-bottom list-group-item align-self-center row fs-5" style={{ width: "20em" }}>
						<p className="col-11 align-self-start m-0 px-0 text-start">{item}</p>
						<p className="col-1 align-self-end text-end m-0 hide">
							<button className="crossButton" onClick={() => setTaskList(taskList.filter((_, index) => index !== i))}>×</button>
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