import { useState } from "react"
import { useNavigate } from "react-router"
import axios from 'axios'
import Login from "./Login"
import { URL, url } from "../../../../confige"

function LoginContainer(props) {

    let navigate = useNavigate()
    const [error, setError] = useState(false)

    let url = URL

    let onSubmit = (event) => {
        event.preventDefault()
        let login = event.target[0].value
        let password = event.target[1].value
        // console.log({ login, password })
        axios.get(`${url}/admins?login=${login}`).then(
            (res) => {
                let data = { ...res.data[0] }
                if (data.password == password) {
                    window.localStorage.setItem('auth', 'true')
                    window.localStorage.setItem('id', data.id)
                    navigate('/admin/user-list')
                }
                else {
                    setError(true)
                }
            }
        )
    }

    let goToReg = () => {
        navigate('/admin-auth/reg')
    }

    let data = {
        onSubmit,
        goToReg,
        error
    }

    return (
        <Login {...data}/>
    )
}

export default LoginContainer