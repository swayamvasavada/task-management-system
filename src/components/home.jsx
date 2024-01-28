import { useNavigate } from "react-router-dom";
import AdminHome from "./admin/admin-home";
import UserHome from "./user/user-home";
import "../style/base.css";
import "../style/forms.css";

export default function Component() {
    const navigate = useNavigate();
    const token = localStorage.getItem('jwtToken');
    const isAdmin = localStorage.getItem('isAdmin');

    if (!token) {
        navigate('/login')
    }

    if (isAdmin === 'false') {
        return <UserHome />
    }
    return <AdminHome />
}