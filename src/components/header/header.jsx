import AdminHeader from "./adminHeader"
import UserHeader from "./userHeader"
import "../../style/base.css";
import "../../style/forms.css";

export default function Component() {

    const token = localStorage.getItem('jwtToken');
    const isAdmin = localStorage.getItem('isAdmin');

    let admin;
    if (token && isAdmin === 'true') {
        admin = true;
    }

    return (
        <>
            {admin ? <AdminHeader /> : <UserHeader />}
        </>
    )
}