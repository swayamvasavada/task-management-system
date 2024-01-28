import "../../style/base.css";
import "../../style/forms.css";

export default function Component() {

    return (
        <>
            <header className="main-header">
                <div id="logo">
                    <a href="/">Tasks</a>
                </div>
                <nav>
                    <ul>
                        <li>
                            <a href="/signup">Sign up</a>
                        </li>

                        <li>
                            <a href="/login">Sign in</a>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}