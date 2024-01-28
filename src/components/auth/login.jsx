import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../header/header"
import "../../style/base.css";
import "../../style/forms.css";

export default function Component() {

    const navigate = useNavigate();

    const token = localStorage.getItem('jwtToken');
    let isAuth;

    if (token) {
        isAuth = true;
    }


    const initialState = {
        email: '',
        password: '',
    };

    const [formData, setFormData] = useState(initialState);


    async function submitForm(e) {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                const result = await res.json();

                if (result.hasError) {
                    return alert(result.message);
                }


                const token = result.token;
                const isAdmin = result.isAdmin;

                localStorage.setItem('jwtToken', token);
                localStorage.setItem('isAdmin', isAdmin);

                navigate('/')
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {isAuth ? <Navigate to='/' /> :

                <div>
                    <Header />
                    <main>
                        <h1>Login</h1>

                        <form onSubmit={submitForm}>

                            <div className="form-control">
                                <label htmlFor="email">Enter Email</label>
                                <input type="email" name="email" id="email" onChange={(e) => {
                                    const { name, value } = e.target;
                                    setFormData({ ...formData, [name]: value })
                                }} />
                            </div>

                            <div className="form-control">
                                <label htmlFor="password">Enter Password</label>
                                <input type="password" name="password" id="password" onChange={(e) => {
                                    const { name, value } = e.target;
                                    setFormData({ ...formData, [name]: value })
                                }} />
                            </div>
                            <button className="btn">Login</button>
                        </form>
                    </main>
                </div>
            }
        </>
    )
}