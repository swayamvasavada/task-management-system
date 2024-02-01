import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../header/header";
import Loader from "../loader";
import TaskItem from "./task-item";
import "../../style/base.css";
import "../../style/forms.css";

export default function Component() {
    const navigate = useNavigate();

    const token = localStorage.getItem('jwtToken');
    const isAdmin = localStorage.getItem('isAdmin');
    let isAuth = false;

    if (token && isAdmin) {
        isAuth = true;
    }

    const [taskData, setTaskData] = useState([]);
    const [isLoading, toogleLoadingState] = useState(false);

    useEffect(() => {
        async function fetchingTask() {
            try {

                toogleLoadingState(true);
                const res = await fetch('https://task-management-backend-lxp0.onrender.com/api/admin/task-view');

                if (res.ok) {
                    const tasks = await res.json();
                    setTaskData(tasks);
                }

                toogleLoadingState(false);
            } catch (error) {
                alert('Something went wrong!');
                console.log(error);
            }
        }

        fetchingTask();
    }, []);

    function getCreateTask() {
        navigate('/create-task');
    }

    return (
        <>
            {isAuth ?
                <div>
                    <Header />
                    {!isLoading ?
                        <main>

                            <h1>Task View</h1>
                            <hr />
                            <div>
                                {taskData.length ?
                                    <ol className="task-list">
                                        {taskData.map((task) => (
                                            <TaskItem task={task} />
                                        ))}
                                    </ol>
                                    :
                                    <div>
                                        <div>No Created Task...</div>

                                        <button className="btn" onClick={getCreateTask}> Create new Task</button>
                                    </div>
                                }
                            </div>
                        </main>
                        :
                        <Loader />
                    }
                </div>
                : <Navigate to='/login' />}
        </>
    )
}