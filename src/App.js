import { useState, useEffect } from "react";

const Container = () => {
    let toDoList = [];

    if (localStorage.getItem("task")) {
        toDoList = JSON.parse(localStorage.getItem("task"));
    }

    const [task, setTask] = useState("");
    const [list, setList] = useState(toDoList);

    const handleTask = (e) => {
        setTask(e.target.value);
    };

    const handlePressingEnter = (e) => {
        if (e.key === "Enter") {
            handleAddTask();
        }
    };

    const handleAddTask = () => {
        if (task !== "") {
            let date = new Date();
            const now = `${date.getDate()}/${
                date.getMonth() + 1
            }/${date.getFullYear()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
            const newTask = {
                timeCreated: now,
                task: task,
                done: 0,
            };
            setList([...list, newTask]);
            setTask("");
        }
    };

    const handleCheck = (e) => {
        const deleteButton = e.target.nextSibling.nextSibling;
        const taskInfoContainer = e.target.nextSibling;
        const key = e.target.dataset.key;
        let currentTask = list.find((o) => o.timeCreated === key);
        let currentTaskIndex = list.map((o) => o.timeCreated).indexOf(key);
        if (e.target.checked) {
            deleteButton.className =
                "w-5 h-5 bg-gray-300 rounded-full leading-5 ml-2 hover:bg-gray-200 active:bg-gray-400";
            taskInfoContainer.className =
                "w-132 my-3 py-3 ml-3 px-3 bg-green-500 rounded-md font-bold text-black text-xl";
            currentTask.done = 1;
        } else {
            deleteButton.className = "hidden";
            taskInfoContainer.className =
                "w-132 my-3 py-3 ml-3 px-3 bg-slate-300 rounded-md font-bold text-gray-500 text-xl";
            currentTask.done = 0;
        }
        list.splice(currentTaskIndex, 1);
        list.push(currentTask);
        localStorage.removeItem("task");
        localStorage.setItem("task", JSON.stringify(list));
        setList(JSON.parse(localStorage.getItem("task")));
    };

    const handleDelete = (e) => {
        let key = e.target.dataset.key;
        let deleteTaskIndex = list.map((o) => o.timeCreated).indexOf(key);
        list.splice(deleteTaskIndex, 1);
        localStorage.removeItem("task");
        localStorage.setItem("task", JSON.stringify(list));
        setList(JSON.parse(localStorage.getItem("task")));
    };

    useEffect(() => {
        console.log("render");
    }, [list]);

    return (
        <div className=" w-1/3 h-5/6 flex flex-col">
            <div className="w-full h-1/5 flex justify-center items-center rounded-t-xl bg-white border-b-4 border-black">
                <input
                    type="text"
                    className="outline-none w-116 h-1/2 px-3 rounded-l-md bg-slate-300"
                    placeholder="Add task..."
                    value={task}
                    onChange={handleTask}
                    onKeyPress={handlePressingEnter}
                />
                <button
                    className="bg-slate-500 text-white text-center font-extrabold w-16 h-1/2 rounded-r-md hover:bg-slate-600"
                    onClick={handleAddTask}
                >
                    ADD
                </button>
            </div>

            <div className="w-full h-4/5 bg-white rounded-b-xl overflow-y-scroll overflow-x-hidden scrollbar">
                <div className="">
                    <ul>
                        {list.map((obj) => {
                            localStorage.setItem("task", JSON.stringify(list));
                            if (obj.done === 1) {
                                return (
                                    <li key={obj.timeCreated}>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name=""
                                                id=""
                                                data-key={obj.timeCreated}
                                                className="w-5 h-5 ml-3 outline-none cursor-pointer appearance-none bg-red-400 rounded-md checked:bg-green-500"
                                                onClick={handleCheck}
                                                defaultChecked="true"
                                            />
                                            <div className="w-132 my-3 py-3 ml-3 px-3 bg-green-500 rounded-md font-bold text-black text-xl">
                                                {obj.task}
                                                <p className="text-tiny font-normal">
                                                    created at:{" "}
                                                    {obj.timeCreated}
                                                </p>
                                            </div>
                                            <button
                                                className="w-5 h-5 bg-gray-300 rounded-full leading-5 ml-2 hover:bg-gray-200 active:bg-gray-400"
                                                onClick={handleDelete}
                                                data-key={obj.timeCreated}
                                            >
                                                -
                                            </button>
                                        </div>
                                    </li>
                                );
                            } else {
                                return (
                                    <li key={obj.timeCreated}>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name=""
                                                id=""
                                                data-key={obj.timeCreated}
                                                className="w-5 h-5 ml-3 outline-none cursor-pointer appearance-none bg-red-400 rounded-md checked:bg-green-500"
                                                onClick={handleCheck}
                                            />
                                            <div className="w-132 my-3 py-3 ml-3 px-3 bg-slate-300 rounded-md font-bold text-gray-500 text-xl">
                                                {obj.task}
                                                <p className="text-tiny font-normal">
                                                    created at:{" "}
                                                    {obj.timeCreated}
                                                </p>
                                            </div>
                                            <button
                                                className="hidden"
                                                onClick={handleDelete}
                                                data-key={obj.timeCreated}
                                            >
                                                -
                                            </button>
                                        </div>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <div className="w-screen h-screen bg-black flex justify-center items-center">
            <Container></Container>
        </div>
    );
};

export default App;
