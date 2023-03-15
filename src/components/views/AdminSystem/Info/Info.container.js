import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import Info from "./Info"
import {URL} from '../../../../confige'

function InfoContainer(props) {

    let navigate = useNavigate()

    let url = URL
    const [humans, setHumans] = useState([])

    const users = useSelector(
        state => state.usersData.users
    )

    let timer;

    useEffect(
        () => {
            timer = setInterval(
                () => {
                    axios.get(`${url}/inbuild/0`).then(
                        res => {
                            let inBuild = res.data.list
                            // console.log(inBuild)
                            axios.get(`${url}/visits`).then(
                                res => {
                                    let list = [...res.data]
                                    list = list.filter(
                                        value => {
                                            if (inBuild.includes(value.id)) {
                                                return true
                                            }
                                            else {
                                                return false
                                            }
                                        }
                                    )
                                    let newUsers = users.filter(
                                        value => {
                                            if (inBuild.includes(value.id)) {
                                                return true
                                            }
                                            else {
                                                return false
                                            }
                                        }
                                    )
                                    // console.log()
                                    if (list.length == newUsers.length) {
                                        // console.log(2)
                                        newUsers = newUsers.map(
                                            (value, index) => {
                                                let last
                                                for (let i = 0; i < list.length; i++) {
                                                    if (value.id == list[i].id) {
                                                        let newList = list[i].list
                                                        last = newList[newList.length - 1]
                                                        break
                                                    }
                                                }
                                                return (
                                                    {
                                                        ...value,
                                                        in: last.in
                                                    }
                                                )
                                            }
                                        )
                                        // console.log(newUsers)
                                        setHumans([...newUsers])
                                    }
                                }
                            )
                        }
                    )
                }, 4000
            )
        }, [users]
    )

    let goToUserInfo = (user) => {
        if (user.type == 'unknown') {
            navigate(`/admin/unknown-info/${user.id}`)
        }
        else {
            navigate(`/admin/user-info/${user.id}`)
        }
    }

    useEffect(
        () => {
            return(
                () => {
                    clearInterval(timer)
                }
            )
        }, []
    )

    let data = {
        humans,
        goToUserInfo
    }

    return (
        <Info {...data} />
    )
}

export default InfoContainer