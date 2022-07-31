import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import UserList from "./UsersList"

function UserListContainer(props) {

    const users = useSelector(
        state => state.usersData.users
    )

    const [list, setList] = useState([])
    const [checked, setChecked] = useState(true)

    useEffect(
        () => {
            if (users) {
                setList([...users].filter(value => value.checked == checked))
            }
        }, [users]
    )

    useEffect(
        () => {
            if (users) {
                setList([...users].filter(value => value.checked == checked))
            }

        }, [checked]
    )

    let changeCheck = (value) => {
        setChecked(value)
    }

    let data = {
        users: list,
        changeCheck,
        checked
    }

    return (
        <UserList {...data} />
    )
}

export default UserListContainer