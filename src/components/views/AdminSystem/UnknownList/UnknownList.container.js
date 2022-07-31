import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import UnknownList from "./UnknownList"

function UnknownListContainer(props) {

    const users = useSelector(
        state => state.usersData.users
    )

    const [list, setList] = useState([])

    useEffect(
        () => {
            if (users) {
                setList([...users].filter(value => value.type == 'unknown'))
            }
        }, [users]
    )

    let data = {
        users: list
    }

    return (
        <UnknownList {...data} />
    )
}

export default UnknownListContainer