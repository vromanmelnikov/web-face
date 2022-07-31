import { useNavigate } from "react-router"
import Auth from "./Auth"

function AuthContainer(props) {

    let navigate = useNavigate()

    let goToUserAuth = () => {
        navigate('/user-auth')
    }

    let goToAdminAuth = () => {
        navigate('/admin-auth/login')
    }

    let data = {
        goToAdminAuth,
        goToUserAuth
    }

    return (
        <Auth {...data} />
    )
}

export default AuthContainer