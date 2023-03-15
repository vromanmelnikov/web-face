import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { setUsers } from "../../../../store/usersReducer"
import UserInfo from "./UserInfo"
import { URL } from '../../../../confige'

function UserInfoContainer(props) {

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
            axios.get(`${url}/scheduler`).then(
                (res) => {
                    setScheduler([...res.data])
                    // console.log(res.data)
                }
            )
        }, []
    )

    useEffect(
        () => {
            let id = parseInt(params.index)
            if (users.length != 0) {
                let user = [...users.filter(
                    value => value?.id == id
                )][0]
                setUser({ ...user })
                if (user != undefined) {
                    axios.get(`${url}/visits/${user.id}`).then(
                        (res) => {
                            let data = res.data
                            setAllVisits([...data.list])
                            let list = data.list
                            if (list.length != 0) {
                                let fIn = { ...list[0].in }
                                let lIn = { ...list[list.length - 1].in }

                                fIn.month += 1
                                lIn.month += 1

                                if (fIn.month < 10) {
                                    fIn.month = `0${fIn.month}`
                                }
                                if (lIn.month < 10) {
                                    lIn.month = `0${lIn.month}`
                                }
                                if (fIn.day < 10) {
                                    fIn.day = `0${fIn.day}`
                                }
                                if (lIn.day < 10) {
                                    lIn.day = `0${lIn.day}`
                                }
                                let date = {
                                    min: `${fIn.year}-${fIn.month}-${fIn.day}`,
                                    max: `${lIn.year}-${lIn.month}-${lIn.day}`,
                                }
                                // console.log(date)
                                setDateValue({ ...date })
                            }

                        }
                    )
                }
            }
        }, [users]
    )

    let onDateChange = (event) => {
        let date = event.target.value
        let year = parseInt(date[0] + date[1] + date[2] + date[3])
        let month = parseInt(date[5] + date[6])
        let day = parseInt(date[8] + date[9])
        setCurrDate({
            day, month, year
        })
    }

    let checkVisits = () => {
        if (currDate == null) {
            return
        }
        let list = allVisits.filter(
            (value) => value.in.day == currDate.day && value.in.month + 1 == currDate.month && value.in.year == currDate.year
        )
        let shList = [...scheduler]
        shList = shList.map(
            (value, index) => {

                let start = value.start
                let finish = value.finish

                // console.log(finish)

                let newList = list.filter(
                    (value) => {
                        let inV = value.in
                        if (inV.hour >= start.hour && inV.hour <= finish.hour) {
                            return true
                        }
                        else {
                            return false
                        }
                    }
                )[0]

                let inV
                let type = 'Присутствовал'

                if (newList == undefined) {
                    type = 'Не присутствовал'
                    inV = undefined
                }
                else {
                    inV = { ...newList?.in }
                    if (newList.in.hour == start.hour && newList.in.minutes > start.minutes) {
                        type = 'Опоздал'
                    }
                    else if (newList.in.hour <= finish.hour) {
                        type = 'Опоздал'
                    }
                }

                // console.log(newList)

                return (
                    {
                        start: { ...value.start },
                        in: inV,
                        type
                    }
                )
            }
        )
        // console.log(shList)
        setVisits([...shList])
    }

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
                // console.log(users)
                let newusers = [...users.map(
                    value => {
                        if (value.id == newuser.id) {
                            return (
                                {
                                    ...newuser,
                                    checked: true
                                }
                            )
                        }
                        else {
                            return (
                                {...value}
                            )
                        }
                    }
                )]
                // console.log(newusers)
                dispatch(setUsers(newusers))
            }
        )
    }

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
                                        value => value.id != useDispatch.id
                                    )
                                    let data = {
                                        list
                                    }
                                    axios.put(`${url}/inbuild/0`, data).then(
                                        (res) => {
                                            // console.log(res)
                                        }
                                    )
                                }
                            }
                        )
                        navigate('/admin/user-list')
                    }
                )
            }
        )
    }

    let data = {
        ...user,
        info,
        showInfo,
        checkUser,
        deleteUser,
        allVisits,
        dateValue,
        onDateChange,
        visits,
        checkVisits
    }

    return (
        <UserInfo {...data} />
    )
}

export default UserInfoContainer