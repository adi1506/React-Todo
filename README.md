---
TODO APP TUTORIAL
Link - https://youtube.com/watch?v=WE8aYoGK0Ec&list=PLM1h1YfjWrWTLlxmwlhchYMXO0JGrf2_Q&index=15&t=267s
View - https://adi1506.github.io/React-Todo/
---

---
A. Initialising the app using vite
    1. npm create vite@latest
    2. npm install
    3. npm run dev
    4. Delete the unnecesary code from App.jsx and index.css
    5. initialse App.jsx with 'rafce'
    6. Install tailwind css using vite
        a. npm install -D tailwindcss postcss autoprefixer
        b. npx tailwindcss init -p
        c. Change tailwind.config.js
        d. Check if tailwind css is working or not

B. Create Todo App UI
    1. Create a Todo.jsx component (create a folder 'component' inside src folder)
    2. import the Todo comp inside App.jsx
    3. Add these properties to the div of App.jsx
        'bg-stone-900 grid py-4 min-h-screen'
    4. Add these properties to the div of Todo.jsx
        "bg-white place-self-center w-11/12 max-w-md 
        flex flex-col p-7 min-h-[550px] rounded-xl"
    5. Create 'Title' inside Todo.jsx
        a. The Title will have a text and an image
        b. <div className="flex items-center mt-7 gap-2">
                <img className="w-8" src={todo_icon} alt="" />
                <h1 className="text-3xl font-semibold">ToDo List</h1>
           </div>
    6. Create input box inside Todo.jsx
        a. The input box will have an input field and a button
        b. <div className="flex items-center my-7 bg-gray-200 rounded-full">
				<input
					className="bg-transparent border-0 outline-none flex-1 h-14 pl-7 pr-2 placeholder: text-slate-600"
					type="text"
					placeholder="Add your text"
				/>
				<button className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer">
					ADD +
				</button>
		    </div>
    7. Create the space for Todo items
        a. We will create a component for this 'TodoItems.jsx'
        b. create the todo item
            i. <div className='flex flex-1 items-center cursor-pointer'>
                <img src={tick} alt="" className='w-7'/>
                <p className='text-slate-700 ml-4 text-[17px]'>Learn Coding</p>
            </div>
        c. create the delete todo item 
            i. <img src={delete_icon} alt="" className='w-3.5 cursor-pointer'/>
        d. Mount the TodoItems.jsx in Todo compoment
    8. Add props 'text' to TodoItems component

C. Adding new task in the Todo app
    1. Create a textRef ref hook that will store the value inside the input field
        const textRef = useRef(null);
    2. Link this textRef to the input field 
        <input
			ref={textRef}
            ...
    3. Create a function addText, that stores the value of input field in the ref hook
        const addText = () => {
            const inputText = textRef.current.value.trim();
            console.log(inputText);
	    };
        //trim() to remove leading and useless white spaces
    4. in the onClick handler of the button add the addText function
    5. Adding the text in Todo list
        a. Create a useState hook
            const [todoList, setTodoList] = useState([]);
            todoList is an array of objects, todo items are stored in the form of objects
        b. Create a new todo item, with id, text and iscomplete as properties
            const newTodo = {
                id: Date.now(),
                text: inputText,
                isComplete: false,
		    };
        c. update the value of the state variable
            setTodoList((prev) => [...prev, newTodo]);
            //here we are including all the prev values in the todo + adding a new todo item
    6. Clear the inoput field after we add a todo item: inside the add() a, after the setState
        a. inputRef.current.value = ""
    7. Add a condition, that if the input field is empty and we click on "ADD+" button, then dont add the todo item:
        a.  if(inputText === ""){
                return null;    
            }
    8. Display the todo list in the app
        a. map over the todoList state var to display the todo items
            {todoList.map((todoItem, index) => {
					return <TodoItems key={index} text={todoItem.text} />;
			})}

D. Delete todo item
    1. Add other properties in the <TodoItems/> component 
        {todoList.map((todoItem, index) => {
					return <TodoItems key={index} text={todoItem.text} id={todoItem.id} isComplete={todoItem.isComplete}/>;
		})}
        //Also update the props in the TodoItems component
    2. create a deleteTodo() function   
        const deleteTodo = (id) => {
            setTodoList((prevTodo) => {
                return prevTodo.filter((todo) => todo.id !== id);
            });
	    };
        //it will filter and update the array with only those todo items whose id do not match
        //i.e the todo item to delete wont be present in the todoItem array and therefore will not be rendered
    3. Pass the deleteTodo function as a prop to <TodoItems/> component
        {todoList.map((todoItem, index) => {
					return (
						<TodoItems
							key={index}
							text={todoItem.text}
							id={todoItem.id}
							isComplete={todoItem.isComplete}
                            deleteTodo={deleteTodo}**
						/>
					);
		})}
    4. Add an onClick handler to the delete img tag and pass the deleteTodo function
        <img onClick={()=> deleteTodo(id)} src={delete_icon} alt="" className='w-3.5 cursor-pointer'/>

E. Mark task as complete or incomplete
    1. Create a toggleTodo function
        const toggleTodo = (id) => {
            setTodoList((prevTodo) => {
                return prevTodo.map((todo) => {
                        if(todo.id === id){
                            return {...todo, isComplete: !todo.isComplete};
                        }
                        return todo;
                    })
                })
        }
    2. link this toggleTodo function with the todo item div as prop
    3. In TodoItem.jsx comp, inside div tag, add the onClick event to use toggleTodo function
    4. create useEffect inside Todo.jsx (after toggleTodo function) and print todoList to check whether it is updating the value of isComplete or not
        useEffect(() => {
		    console.log(todoList);
	    }, [todoList]);
    5. Inside TodoItems, in the img tag for tick/untick, display tick img if inComplete = true and vice versa
        <img  src={isComplete ? tick : not_tick} alt="" className='w-7'/>
    6. Inside TodoItems, in the p tag, create a linethrough across the text if isComplete = true and vice versa
        <p className={`text-slate-700 ml-4 text-[17px] ${isComplete ? "line-through" : ""}`}>{text}</p>
        -Note: we use TEMPLATE LITERAL to achieve this

F. Store task list in the browser
    1. In the useEffect of Todo comp
        useEffect(() => {
		    localStorage.setItem("todo", JSON.stringify(todoList));
	    }, [todoList]);
    2. It will store the data in local storage but upon refresh it will resit because todoList state var resets to an empty array after every refresh. so instead we will fetch the todoList from the localstorage
        const [todoList, setTodoList] = useState(localStorage.getItem("todo")? JSON.parse(localStorage.getItem("todo")) : []);
        - We check if there is any "todo" key named object inside localstorage, if yes then we convert the JSON string into object and fetch it and if there is no todo inside localstorage then we just initialise with an empty array