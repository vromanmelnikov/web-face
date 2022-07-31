import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { setUsers } from "../../../../store/usersReducer"
import UserInfo from "./UserInfo"

function UserInfoContainer(props) {

    let url = 'http://localhost:3000'

    let navigate = useNavigate()

    let params = useParams()
    const users = useSelector(
        state => state.usersData.users
    )

    const dispatch = useDispatch()

    const [user, setUser] = useState()
    const [info, setInfo] = useState('')

    useEffect(
        () => {
            let id = parseInt(params.index)
            let user = [...users.filter(
                value => value.id == id
            )][0]
            setUser({ ...user })
        }, [users]
    )

    let showInfo = () => {
        if (user.type == 'student') {
            setInfo(`Группа: ${user.group}`)
        }
        else if (user.type == 'teacher') {
            setInfo(`Предмет: ${user.subject}`)
        }
    }

    let checkUser = () => {
        let newuser = {
            ...user,
            checked: true
        }
        setUser(newuser)
        axios.put(`${url}/users/${user.id}`, newuser).then(
            (res) => {
                let newusers = [...users].map(
                    value => {
                        if (value.id == newuser.id) {
                            return (
                                {
                                    ...newuser,
                                    checked: true
                                }
                            )
                        }
                    }
                ) 
                dispatch(setUsers(newusers))
            }
        )
    }

    let deleteUser = () => {
        axios.delete(`${url}/users?id=${user.id}`).then(
            (res) => {
                // console.log(res)
                let newusers = [...users].filter(
                    value => value.id != user.id
                ) 
                dispatch(setUsers(newusers))
                navigate('/admin/user-list')
            }
        )
    }

    let data = {
        ...user,
        info,
        showInfo,
        checkUser,
        deleteUser
    }

    return (
        <UserInfo {...data} />
    )
}

export default UserInfoContainer