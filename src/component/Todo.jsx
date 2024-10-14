import React, { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import TodoItems from "./TodoItems";

const Todo = () => {
	const [todoList, setTodoList] = useState([]);

	const textRef = useRef(null);

	const addText = () => {
		const inputText = textRef.current.value.trim();

		if (inputText === "") {
			return null;
		}

		const newTodo = {
			id: Date.now(),
			text: inputText,
			isComplete: false,
		};

		setTodoList((prev) => [...prev, newTodo]);
		textRef.current.value = "";
	};

	const deleteTodo = (id) => {
		setTodoList((prevTodo) => {
			return prevTodo.filter((todo) => todo.id !== id);
		});
	};

	// const toggleTodo = (id) => {
	// 	setTodoList((prevTodo) => {
	// 		return prevTodo.map((todo) => {
	// 			if (todo.id === id) {
	// 				return { ...todo, isComplete: !todo.isComplete };
	// 			}
	// 			return todo;
	// 		});
	// 	});
	// };

	// useEffect(() => {
	// 	console.log(todoList);
	// }, [todoList]);

	return (
		<div
			className="bg-white place-self-center w-11/12 max-w-md 
        flex flex-col p-7 min-h-[550px] rounded-xl"
		>
			{/* title  */}
			<div className="flex items-center mt-7 gap-2">
				<img className="w-8" src={todo_icon} alt="" />
				<h1 className="text-3xl font-semibold">ToDo List</h1>
			</div>

			{/* input box */}
			<div className="flex items-center my-7 bg-gray-200 rounded-full">
				<input
					ref={textRef}
					className="bg-transparent border-0 outline-none flex-1 h-14 pl-7 pr-2 placeholder: text-slate-600"
					type="text"
					placeholder="Add your text"
				/>
				<button
					onClick={addText}
					className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer"
				>
					ADD +
				</button>
			</div>

			{/* Todo Items */}
			<div>
				{todoList.map((todoItem, index) => {
					return (
						<TodoItems
							key={index}
							text={todoItem.text}
							id={todoItem.id}
							isComplete={todoItem.isComplete}
							deleteTodo={deleteTodo}
							// toggleTodo={toggleTodo}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Todo;
