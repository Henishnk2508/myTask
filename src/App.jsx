import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { RiAddLargeFill } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

function App() {
  const [Task, setTask] = useState("");
  const [Tasks, setTasks] = useState([]);
  const [ShowFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let taskString = localStorage.getItem("Tasks");
    if (taskString) {
      let Tasks = JSON.parse(localStorage.getItem("Tasks"));
      setTasks(Tasks);
    }
  }, []);

  const saveToLs = (params) => {
    localStorage.setItem("Tasks", JSON.stringify(Tasks));
  };

  const toggleFinished = (e) => {
    setShowFinished(!ShowFinished);
  };

  const handleEdit = (e, id) => {
    let t = Tasks.filter((i) => i.id === id);
    setTask(t[0].Task);
    let newTasks = Tasks.filter((item) => {
      return item.id !== id;
    });
    setTasks(newTasks);
    saveToLs();
  };

  const handleDelete = (e, id) => {
    let newTasks = Tasks.filter((item) => {
      //confirm("are you sure you want to Delete?");
      return item.id !== id;
    });
    setTasks(newTasks);
    saveToLs();
  };

  const handleAdd = () => {
    setTasks([...Tasks, { Task, id: uuidv4(), isCompleted: false }]);
    setTask("");
    saveToLs();
  };

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = Tasks.findIndex((item) => {
      return item.id == id;
    });
    let newTasks = [...Tasks];
    newTasks[index].isCompleted = !newTasks[index].isCompleted;
    setTasks(newTasks);
    saveToLs();
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl bg-violet-200 p-5  min-h-[80vh] md:w-[35%]">
        <h1 className="font-bold text-center text-2xl">
          myTask - One Place Task Manager
        </h1>
        <div className="addTask my-5 flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Add a Task</h2>
          <div className="flex ">
            <input
              onChange={handleChange}
              value={Task}
              type="text"
              className="w-full rounded-full px-5 py-1"
            />
            <button
              onClick={handleAdd}
              disabled={Task.length < 3}
              className=" bg-purple-600 hover:bg-purple-800 disabled:bg-purple-400 rounded-full p-2 text-md font-semibold text-white mx-2"
            >
              <RiAddLargeFill />
            </button>
          </div>
        </div>
        <input
          className="my-3"
          onChange={toggleFinished}
          id="show"
          type="checkbox"
          checked={ShowFinished}
        />
        <label htmlFor="show">Show Finished</label>
        <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2 "></div>

        <h2 className="text-xl font-semibold">Your Tasks</h2>
        <div className="tasks">
          {Tasks.length === 0 && <div className="m-5">No Tasks To Display</div>}
          {Tasks.map((item) => {
            return (
              (ShowFinished || !item.isCompleted) && (
                <div key={item.id} className="task flex justify-between my-2">
                  <div className="flex gap-5 ">
                    <input
                      name={item.id}
                      onChange={handleCheckBox}
                      type="checkbox"
                      checked={item.isCompleted}
                      id=""
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.Task}
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className=" bg-purple-500 hover:bg-green-600 rounded-md p-3 py-1 px-2 text-sm font-semibold mx-1 text-white"
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className=" bg-purple-500 hover:bg-red-500 rounded-md p-3 py-1 px-2 text-sm font-semibold mx-1 text-white"
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
