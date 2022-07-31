import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import UserInfo from "./UserInfo"

function UserInfoContainer(props) {

    let params = useParams()
    const users = useSelector(
        state => state.usersData.users
    )

    const [user, setUser] = useState()
    const [info, setInfo] = useState('')

    useEffect(
        () => {
            let index = parseInt(params.index)
            setUser({ ...users[index] })
            if (user) {
                if (user.type == 'student') {
                    setInfo(`Группа: ${user.group}`)
                }
                else if (user.type == 'teacher') {
                    setInfo(`Предмет: ${user.subject}`)
                }
            }
        }, [users, user]
    )

    let data = {
        ...user,
        info
    }

    return (
        <UserInfo {...data} />
    )
}

export default UserInfoContainer