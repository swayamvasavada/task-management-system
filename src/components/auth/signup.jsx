import { Navigate, useNavigate } from "react-router-dom";
import Header from "../header/header"
import "../../style/base.css";
import "../../style/forms.css";
import { useState } from "react";


export default function Component() {

    const navigate = useNavigate();

    const token = localStorage.getItem('jwtToken');
    let isAuth;
    if (token) {
        isAuth = true;
    }

    const initialState = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const [formData, setFormData] = useState(initialState);


    async function submitForm(e) {
        e.preventDefault();

        try {
            const res = await fetch('https://task-management-backend-lxp0.onrender.com/api/auth/signup', {
                method: 'POST',
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                const result = await res.json();

                if (result.hasError) {
                    return alert(result.message);
                }

                navigate('/login')
            }

        } catch (error) {
            alert('something went wrong!');
            console.log(error);
        }
    }


    return (
        <>
            {
                isAuth ? <Navigate to='/' /> :
                    <div>
                        <Header />
                        <main>
                            <h1>Create Account</h1>

                            <form onSubmit={submitForm}>

                                <div className="form-control">
                                    <label htmlFor="name">Enter Name</label>
                                    <input type="text" name="name" id="name" onChange={(e) => {
                                        const { name, value } = e.target;
                                        setFormData({ ...formData, [name]: value });
                                    }} />
                                </div>

                                <div className="form-control">
                                    <label htmlFor="email">Enter Email</label>
                                    <input type="email" name="email" id="email" onChange={(e) => {
                                        const { name, value } = e.target;
                                        setFormData({ ...formData, [name]: value });
                                    }} />
                                </div>

                                <div className="form-control">
                                    <label htmlFor="password">Enter Password</label>
                                    <input type="password" name="password" id="password" onChange={(e) => {
                                        const { name, value } = e.target;
                                        setFormData({ ...formData, [name]: value });
                                    }} />
                                </div>
                                <div className="form-control">
                                    <label htmlFor="confirmPassword">Re-type Password</label>
                                    <input type="password" name="confirmPassword" id="confirmPassword" onChange={(e) => {
                                        const { name, value } = e.target;
                                        setFormData({ ...formData, [name]: value });
                                    }} />
                                </div>

                                <button className="btn">Create Account</button>
                            </form>
                        </main>
                    </div>
            }
        </>
    )
}