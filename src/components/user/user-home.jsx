import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../header/header";
import Loader from "../loader"
import "../../style/base.css";
import "../../style/forms.css";
import "../../style/tasks.css";

export default function Component() {

    const navigate = useNavigate();

    const [isLoading, toogleLoadingState] = useState(false);
    const [taskData, setTaskData] = useState([]);
    const token = localStorage.getItem('jwtToken');
    let isAuth;

    if (token) {
        isAuth = true;
    }

    useEffect(() => {
        async function fetchingTask() {

            try {
                toogleLoadingState(true);

                const res = await fetch('https://task-management-backend-lxp0.onrender.com/api/user/task-view', {
                    method: 'POST',
                    body: token,
                });

                if (res.ok) {
                    const task = await res.json();
                    setTaskData(task);
                }

                toogleLoadingState(false);
            } catch (error) {
                console.log(error);
            }
        }

        fetchingTask();
    }, []);


    async function completeTask(e) {
        const taskId = e.target.dataset.taskId;

        const formData = {
            token: token,
            taskId: taskId
        }

        try {
            toogleLoadingState(true);

            const res = await fetch('http://localhost:3001/api/user/complete-task', {
                method: 'POST',
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                navigate(0);
            }

            toogleLoadingState(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {!isAuth ? <Navigate to='/login' /> :

                <div>
                    <Header />

                    {!isLoading ?
                        <main>
                            <h1>Task View</h1>
                            <hr />
                            <div>
                                {taskData ?
                                    <div className="task-info">

                                        <h2>{taskData.taskName}</h2>
                                        <div className="task-info-container">
                                            <span>Description: </span>
                                            <p>{taskData.taskDesc}</p>
                                        </div>

                                        <div className="task-info-container">
                                            <span>Refferences:</span>
                                            <a href={taskData.refferenceUrl} className=""> {taskData.refferenceUrl}</a>
                                        </div>

                                        <h4>Submit by {new Date(taskData.deadline).toLocaleDateString()}</h4>
                                        <button data-taskId={taskData._id} onClick={completeTask} className="btn">Mark as Complete</button>
                                    </div>
                                    :
                                    <div>
                                        Currently, You does not have any pending task...
                                    </div>
                                }
                            </div>
                        </main>
                        : <Loader />
                    }
                </div>
            }
        </>
    )
}