import { useEffect } from "react"
import { useDispatch } from "react-redux"
import AdminSystem from "./AdminSystem"
import axios from 'axios'
import { setUsers } from "../../../store/usersReducer"

function AdminSystemContainer (props) {

    const url = 'http://localhost:3000'
    const dispatch = useDispatch()

    useEffect(
        () => {
            axios.get(`${url}/users`).then(
                (res) => {
                    dispatch(setUsers([...res.data]))
                    // console.log(res.data)
                }
            )
        }, []
    )

    return(
        <AdminSystem />
    )
}

export default AdminSystemContainer