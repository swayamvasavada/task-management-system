import UnauthHeader from "./unauthHeader"
import { useNavigate } from "react-router-dom";
import "../../style/base.css";
import "../../style/forms.css";

export default function Component() {

    const navigate = useNavigate();
    const token = localStorage.getItem('jwtToken');

    function logout() {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('isAdmin');
        navigate('/login')
        return;
    }

    return (
        <>
            {!token ? <UnauthHeader /> :
                <header className="main-header">
                    <div id="logo">
                        <a href="/">Tasks</a>
                    </div>
                    <nav>
                        <ul>
                            <li>
                                <button onClick={logout} className="btn-alt">Logout</button>
                            </li>
                        </ul>
                    </nav>
                </header>
            }
        </>
    )
}