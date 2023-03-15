import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { URL } from "../../../../confige"
import { setUsers } from "../../../../store/usersReducer"
import UnknownInfo from "./UnknownInfo"

function UnknownInfoContainer(props) {

    let url = URL

    let days = [
        'Понедельник',
        '',
        '',
        '',
        '',
        '',
        ''
    ]

    let navigate = useNavigate()

    let params = useParams()
    const users = useSelector(
        state => state.usersData.users
    )

    const dispatch = useDispatch()

    const [user, setUser] = useState()
    const [info, setInfo] = useState('')
    const [dateValue, setDateValue] = useState({
        min: '2022-07-31',
        max: '2022-08-01'
    })
    const [currDate, setCurrDate] = useState(null)

    const [visits, setVisits] = useState([])
    const [allVisits, setAllVisits] = useState([])
    const [scheduler, setScheduler] = useState([])

    useEffect(
        () => {
            let id = parseInt(params.index)
            let user = [...users.filter(
                value => value.id == id
            )][0]
            setUser({ ...user })
            if (user != undefined) {
                axios.get(`${url}/visits/${user?.id}`).then(
                    (res) => {
                        let data = res.data
                        setAllVisits([...data.list])
                    }
                )
            }
        }, [users]
    )

    let deleteUser = () => {
        axios.delete(`${url}/users/${user.id}`).then(
            (res) => {
                // console.log(res)
                let newusers = [...users].filter(
                    value => value.id != user.id
                )
                dispatch(setUsers(newusers))
                axios.delete(`${url}/visits/${user.id}`).then(
                    (res) => {
                        axios.get(`${url}/inbuild/0`).then(
                            (res) => {
                                let list = [...res.data.list]
                                if (list.includes(user.id) == true) {
                                    list = list.filter(
                                        value => value.id != user.id
                                    )
                                    let data = {
                                        list
                                    }
                                    axios.put(`${url}/inbuild/0`, data).then(
                                        (res) => {
                                            navigate('/admin/unknown-list')
                                        }
                                    )
                                }
                            }
                        )
                    }
                )
            }
        )
    }

    let data = {
        ...user,
        deleteUser,
        allVisits,
        visits,
    }

    return (
        <UnknownInfo {...data} />
    )
}

export default UnknownInfoContainer