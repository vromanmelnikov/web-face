import { useEffect } from "react"
import { useDispatch } from "react-redux"
import AdminSystem from "./AdminSystem"
import axios from 'axios'
import { setUsers } from "../../../store/usersReducer"
import { useNavigate } from "react-router"

function AdminSystemContainer (props) {

    const url = 'http://localhost:3000'
    const dispatch = useDispatch()

    let navigate = useNavigate()

    useEffect(
        () => {
            let auth = window.localStorage.getItem('auth')
            if (auth == 'true') {
            axios.get(`${url}/users`).then(
                (res) => {
                    dispatch(setUsers([...res.data]))
                    // console.log(res.data)
                }
            )
            }
            else {
                navigate('/')
            }
        }, []
    )

    return(
        <AdminSystem />
    )
}

export default AdminSystemContainer