import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../header/header"
import Loader from "../loader";
import "../../style/base.css";
import "../../style/forms.css";
import "../../style/tasks.css";


export default function Component() {

    const navigate = useNavigate();

    const token = localStorage.getItem('jwtToken');
    const isAdmin = localStorage.getItem('isAdmin');
    let isAuth = false;

    if (token && isAdmin) {
        isAuth = true;
    }

    const initialState = {
        taskName: '',
        taskDesc: '',
        refferenceUrl: '',
        deadline: '',
        userId: ''
    }

    const [formData, setFormData] = useState(initialState);
    const [isLoading, toogleLoadingState] = useState(false);

    const [availableUser, setUser] = useState([]);

    useEffect(() => {
        async function fetchUser() {
            const res = await fetch(process.env.REACT_APP_API_URI + '/api/admin/available-user');
            const users = await res.json();

            setUser(users);
        }

        fetchUser();
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    async function submitForm(e) {
        e.preventDefault();

        try {

            toogleLoadingState(true);
            const res = await fetch('https://task-management-backend-lxp0.onrender.com/api/admin/create-task', {
                method: 'POST',
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                navigate('/');
            }

            toogleLoadingState(false);
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
                    {!isLoading ?
                        <main>
                            <h1>Create Task</h1>
                            <form onSubmit={submitForm}>
                                <div className="form-control">
                                    <label htmlFor="taskName">Task name</label>
                                    <input type="text" name="taskName" id="taskName" onChange={handleChange} required />
                                </div>

                                <div className="form-control">
                                    <label htmlFor="taskDesc">Task Description</label>
                                    <input type="text" name="taskDesc" id="taskDesc" onChange={handleChange} required />
                                </div>

                                <div className="form-control">
                                    <label htmlFor="refferenceUrl">Refference URL</label>
                                    <input type="url" name="refferenceUrl" id="refferenceUrl" onChange={handleChange} required />
                                </div>

                                <div className="form-control">
                                    <label htmlFor="deadline">Deadline</label>
                                    <input type="date" name="deadline" id="deadline" onChange={handleChange} required />
                                </div>

                                <div className="form-control">
                                    <label htmlFor="userId">Assign User</label>
                                    <select name="userId" id="userId" onChange={handleChange} required>

                                        <option hidden>Select User</option>
                                        {
                                            availableUser.length ?
                                                availableUser.map((user) => (
                                                    <option value={user._id}>{user.name}</option>
                                                )) : <option disabled> No available User</option>
                                        }
                                    </select>
                                </div>

                                <button className="btn">Create Task</button>
                            </form>
                        </main>
                        : <Loader />
                    }
                </div>
                : <Navigate to='/login' />
            }
        </>
    )
}