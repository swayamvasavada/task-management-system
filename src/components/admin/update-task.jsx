import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Header from "../header/header"
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

    const { taskId } = useParams();
    const [taskData, setTaskData] = useState([]);
    const [availableUser, setUser] = useState([]);

    const initialState = {
        taskName: '',
        taskDesc: '',
        refferenceUrl: '',
        deadline: '',
        userId: ''
    }

    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        async function fetchingTask() {
            try {
                const res = await fetch('http://localhost:3001/api/admin/task-detail', {
                    method: 'POST',
                    body: taskId
                });

                if (res.ok) {
                    const tasks = await res.json();
                    setTaskData(tasks);

                    setFormData({
                        taskName: tasks.taskName,
                        taskDesc: tasks.taskDesc,
                        refferenceUrl: tasks.refferenceUrl,
                        deadline: tasks.deadline,
                        userId: tasks.assignedUserId
                    });
                }
            } catch (error) {
                alert('Something went wrong!');
                console.log(error);
            }

        }

        async function fetchUser() {
            const res = await fetch('http://localhost:3001/api/admin/available-user');
            const users = await res.json();

            setUser(users);
        }

        fetchingTask();
        fetchUser();
    }, []);

    const deadlineDate = new Date(taskData.deadline);
    const htmlFormatDate = `${deadlineDate.getFullYear()}-${(deadlineDate.getMonth() + 1).toString().padStart(2, '0')}-${deadlineDate.getDate().toString().padStart(2, '0')}`

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    async function submitForm(e) {
        e.preventDefault();

        const formBody = {
            taskId: taskId,
            ...formData
        }

        try {
            const res = await fetch('http://localhost:3001/api/admin/update-task', {
                method: 'POST',
                body: JSON.stringify(formBody)
            });

            if (res.ok) {
                const result = await res.json();
                navigate('/');
            }
        } catch (error) {
            alert('Something went wrong!');
            console.log(error);
        }
    }


    return (
        <>

            {isAuth ?
                <div>
                    <Header />
                    <main>
                        <h1>Update Task</h1>
                        <form onSubmit={submitForm}>
                            <div className="form-control">
                                <label htmlFor="taskName">Task name</label>
                                <input type="text" name="taskName" id="taskName" value={formData.taskName} onChange={handleChange} required />
                            </div>

                            <div className="form-control">
                                <label htmlFor="taskDesc">Task Description</label>
                                <input type="text" name="taskDesc" id="taskDesc" value={formData.taskDesc} onChange={handleChange} required />
                            </div>

                            <div className="form-control">
                                <label htmlFor="refferenceUrl">Refference URL</label>
                                <input type="url" name="refferenceUrl" id="refferenceUrl" value={formData.refferenceUrl} onChange={handleChange} required />
                            </div>

                            <div className="form-control">
                                <label htmlFor="deadline">Deadline</label>
                                <input type="date" name="deadline" id="deadline" value={htmlFormatDate} onChange={handleChange} required />
                            </div>

                            <div className="form-control">
                                <label htmlFor="userId">Assign User</label>
                                <select name="userId" id="userId" onChange={handleChange} required>

                                    <option value={formData.assignedUserId} selected >{taskData.assignedUser}</option>
                                    {
                                        availableUser.map((user) => (
                                            <option value={user._id}>{user.name}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <button className="btn">Create Task</button>
                        </form>
                    </main>
                </div>
                : <Navigate to='/login' />
            }
        </>
    )
}