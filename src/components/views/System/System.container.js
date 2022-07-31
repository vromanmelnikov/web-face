import { useEffect } from "react";
import { useNavigate } from "react-router";
// import { AuthServise } from "../../../servises/auth.servise";
import System from "./System";

function SystemContainer(props) {

    // let auth: AuthServise = new AuthServise()
    // let navigate = useNavigate()

    // useEffect(
    //     () => {
    //         let authFlag = auth.checkAuth()
    //         if (authFlag == false) {
    //             navigate('/auth/login')
    //         }
    //     }, []
    // )

    return (
        <System />
    )
}

export default SystemContainer