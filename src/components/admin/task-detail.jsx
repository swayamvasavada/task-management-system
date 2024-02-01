import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import Header from "../header/header"
import Loader from "../loader";
import "../../style/base.css";
import "../../style/forms.css";

export default function Component(props) {

    const { taskId } = useParams();
    const [isLoading, toogleLoadingState] = useState(false);
    const [taskData, setTaskData] = useState([]);

    const token = localStorage.getItem('jwtToken');
    const isAdmin = localStorage.getItem('isAdmin');
    let isAuth = false;

    if (token && isAdmin) {
        isAuth = true;
    }

    useEffect(() => {
        async function fetchingTask() {
            try {
                toogleLoadingState(true);

                const res = await fetch('https://task-management-backend-lxp0.onrender.com/api/admin/task-detail', {
                    method: 'POST',
                    body: taskId
                });

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

    return (
        <>
            {isAuth ?
                <div>
                    <Header />
                    {!isLoading ?
                        <main>
                            <h1>Task Detail</h1>
                            <hr />
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

                                <div className="task-info-container">
                                    <span>Assigned to: </span>
                                    <p>{taskData.assignedUser}</p>
                                </div>

                                <h4>Expected by {new Date(taskData.deadline).toLocaleDateString()}</h4>
                            </div>
                        </main>
                        : <Loader /> 
                    }
                </div>
                : <Navigate to='/login' />
            }
        </>
    )
}