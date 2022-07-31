import { useNavigate } from "react-router";
import Header from "./Header";

function HeaderContainer(props) {

    let navigate = useNavigate()

    let goByLink = (link) => {
        navigate(link)
    }

    let data = {
        goByLink
    }

    return (
        <Header {...data}/>
    )
}

export default HeaderContainer