import { useState } from "react"
import { useNavigate } from "react-router"
import axios from 'axios'
import Registration from "./Registration"

import { URL } from '../../../../confige'

function RegistrationContainer(props) {

    let url = URL

    let navigate = useNavigate()
    // const [error, setError] = useState(false)
    const [passError, setPassError] = useState(false)
    const [exError, setExError] = useState(false)

    const [pass_1, setPass_1] = useState('')
    const [pass_2, setPass_2] = useState('')

    let onPassChange_1 = (event) => {
        let value = event.target.value
        setPass_1(value)
    }

    let onPassChange_2 = (event) => {
        let value = event.target.value
        setPass_2(value)
        if (value != pass_1) {
            setPassError(true)
        }
        else {
            setPassError(false)
        }
    }

    let onSubmit = (event) => {
        event.preventDefault()
        let login = event.target[0].value
        let lastname = event.target[1].value
        let firstname = event.target[2].value
        let password_1 = event.target[3].value
        let password_2 = event.target[4].value

        if (password_1 != password_2) {
            setPassError(true)
        }
        else {

            console.log({ login, lastname, firstname, password_1 })
            axios.get(`${url}/admins?login=${login}`).then(
                (res) => {
                    if (res.data.length == 0) {
                        let data = {
                            lastname,
                            firstname,
                            login,
                            password: password_1,
                            type: "admin"
                        }
                        axios.post(`${url}/admins`, data).then(
                            (res) => {
                                window.localStorage.setItem('auth', 'true')
                                window.localStorage.setItem('id', data.id)
                                navigate('/admin/user-list')
                            }
                        )
                    }
                    else {
                        setExError(true)
                    }
                }
            )

        }
    }

    let goToLog = () => {
        navigate('/admin-auth/login')
    }

    let data = {
        onSubmit,
        goToLog,
        onPassChange_1,
        onPassChange_2,
        exError,
        passError
    }

    return (
        <Registration {...data} />
    )
}

export default RegistrationContainer