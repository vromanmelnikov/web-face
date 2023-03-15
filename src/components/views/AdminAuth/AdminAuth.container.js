import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { URL} from "../../../confige";
import AdminAuth from "./AdminAuth";

function AdminAuthContainer(props) {

    let url = URL
    let navigate = useNavigate()

    useEffect(
        () => {
            let auth = window.localStorage.getItem('auth')
            if (auth == 'true') {
                let id = parseInt(window.localStorage.getItem('id'))
                axios.get(`${url}/admins/${id}`).then(
                    (res) => {
                        if (res.data) {
                            navigate('/admin/user-list')
                        }
                    }
                )
            }

        }
    )

    return (
        <AdminAuth />
    )
}

export default AdminAuthContainer