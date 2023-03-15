import { useEffect } from "react"
import { useDispatch } from "react-redux"
import AdminSystem from "./AdminSystem"
import axios from 'axios'
import { setUsers } from "../../../store/usersReducer"
import { useNavigate } from "react-router"
import {URL} from '../../../confige'

function AdminSystemContainer (props) {

    const url = URL
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