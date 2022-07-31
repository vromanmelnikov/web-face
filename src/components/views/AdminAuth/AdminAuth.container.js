import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import AdminAuth from "./AdminAuth";

function AdminAuthContainer(props) {

    let url = 'http://localhost:3000'
    let navigate = useNavigate()

    useEffect(
        () => {
            let id = parseInt(window.localStorage.getItem('id'))
            axios.get(`${url}/admins/${id}`).then(
                (res) => {
                    if (res.data) {
                        navigate('/admin/user-list')
                    }
                }
            )
        }
    )

    return (
        <AdminAuth />
    )
}

export default AdminAuthContainer