import { Navigate, useNavigate } from "react-router-dom";
import "../../style/base.css";
import "../../style/forms.css";
import "../../style/tasks.css";


export default function Component(props) {

    const navigate = useNavigate();

    const token = localStorage.getItem('jwtToken');
    const isAdmin = localStorage.getItem('isAdmin');
    let isAuth = false;

    if (token && isAdmin) {
        isAuth = true;
    }

    async function deleteTask(e) {
        const id = e.target.dataset.id;

        try {
            const res = await fetch(process.env.REACT_APP_API_URI + '/api/admin/delete-task', {
                method: 'POST',
                body: id
            })

            if (res.ok) {
                navigate(0)
            }
        } catch (error) {
            alert('Something went wrong!');
            console.log(error);
        }
    }

    async function viewTask(e) {
        const taskId = e.target.dataset.id;

        navigate(`/task/${taskId}`);
    }

    async function updateTask(e) {
        const taskId = e.target.dataset.id;

        navigate(`/update-task/${taskId}`);
    }

    return (
        <>
            {isAuth ?
                <li>
                    <article className="task-item">
                        <h2>{props.task.taskName}</h2>
                        <p>Complete by {new Date(props.task.deadline).toLocaleDateString()}</p>
                        <div className="task-actions">
                            <button data-id={props.task._id} onClick={updateTask} className="task-action btn btn-alt">Update</button>
                            <button data-id={props.task._id} onClick={deleteTask} className="task-action btn-alt">Delete</button>
                            <button data-id={props.task._id} onClick={viewTask} className="task-action btn">View</button>
                        </div>
                    </article>
                </li>
                : <Navigate to='/login' />
            }
        </>
    )
}