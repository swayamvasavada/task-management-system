import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../header/header";
import "../../style/base.css";
import "../../style/forms.css";
import "../../style/tasks.css";

export default function Component() {

    const navigate = useNavigate();

    const [taskData, setTaskData] = useState([]);
    const token = localStorage.getItem('jwtToken');
    let isAuth;

    if (token) {
        isAuth = true;
    }

    useEffect(() => {
        async function fetchingTask() {

            try {
                const res = await fetch( process.env.API_URL + '/api/user/task-view', {
                    method: 'POST',
                    body: token,
                });

                if (res.ok) {
                    const task = await res.json();
                    setTaskData(task);
                }
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
            const res = await fetch('http://localhost:3001/api/user/complete-task', {
                method: 'POST',
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                const result = await res.json();
                navigate(0);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {!isAuth ? <Navigate to='/login' /> :

                <div>
                    <Header />
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
                </div>
            }
        </>
    )
}