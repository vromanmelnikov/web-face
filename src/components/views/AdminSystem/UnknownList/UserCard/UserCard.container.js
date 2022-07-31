import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import UserCard from "./UserCard"

function UserCardContainer(props) {

    let navigate = useNavigate()

    let user = {...props.user}

    let data = {
        ...user
    }

    return(
        <UserCard {...data}/>
    )
}

export default UserCardContainer