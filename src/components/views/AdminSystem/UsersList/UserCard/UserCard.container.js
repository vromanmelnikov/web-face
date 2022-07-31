import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import UserCard from "./UserCard"

function UserCardContainer(props) {

    let navigate = useNavigate()

    let user = {...props.user}
    const [info, setInfo] = useState('')

    useEffect(
        () => {
            if (user.type == 'student'){
                setInfo(`Группа: ${user.group}`)
            }
            else if (user.type == 'teacher'){
                setInfo(`Предмет: ${user.subject}`)
            }
        }, []
    )

    let goToUserInfo = () => {
        let id = user.id
        navigate(`/admin/user-info/${id}`)
    }

    let data = {
        ...user,
        info,
        goToUserInfo
    }

    return(
        <UserCard {...data}/>
    )
}

export default UserCardContainer