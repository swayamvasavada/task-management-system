import { useNavigate } from "react-router-dom";
import "../../style/base.css";
import "../../style/admin-header.css";
import { useState } from "react";

export default function Component() {

    const navigate = useNavigate();

    const [mobileHeader, setVisiblity] = useState(false);

    function toggleVisiblity() {
        setVisiblity(!mobileHeader);
    }

    function logout() {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('isAdmin');
        navigate('/login')
        return;
    }

    return (
        <>
            {!mobileHeader ?
                <header class="main-header" id="auth-header">
                    <div id="logo">
                        <a href="/">Tasks</a>
                    </div>
                    <nav>
                        <ul>
                            <li>
                                <a href="/">All Task</a>
                            </li>

                            <li>
                                <a href="/create-task">Create Task</a>
                            </li>

                            <li>
                                <button className="btn-alt" onClick={logout}>Logout</button>
                            </li>
                        </ul>

                        <div class="menu-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Menu" onClick={toggleVisiblity}>
                                <g data-name="Layer 2" fill="#f7f8f8" class="color000000 svgShape"><g data-name="menu-2" fill="#f7f8f8" class="color000000 svgShape"><circle cx="4" cy="12" r="1" fill="#f7f8f8" class="color000000 svgShape"></circle><rect width="14" height="2" x="7" y="11" rx=".94" ry=".94" fill="#f7f8f8" class="color000000 svgShape"></rect><rect width="18" height="2" x="3" y="16" rx=".94" ry=".94" fill="#f7f8f8" class="color000000 svgShape"></rect><rect width="18" height="2" x="3" y="6" rx=".94" ry=".94" fill="#f7f8f8" class="color000000 svgShape"></rect></g></g>
                            </svg>
                        </div>

                    </nav>
                </header>
                :

                <aside id="mobile-header">
                    <nav>
                        <div className="close-button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" id="Close" onClick={toggleVisiblity}>
                                <path d="M38 12.83 35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z" fill="#f7f8f8" class="color000000 svgShape"></path><path fill="none" d="M0 0h48v48H0z"></path>
                            </svg>
                        </div>
                        <div id="logo">
                            <a href="/">Tasks</a>
                        </div>
                        <ul>
                            <li>
                                <a href="/">All Task</a>
                            </li>

                            <li>
                                <a href="/create-task">Create Task</a>
                            </li>

                            <li>
                                <button className="btn-alt" onClick={logout}>Logout</button>
                            </li>
                        </ul>
                    </nav>
                </aside>
            }
        </>
    )
}