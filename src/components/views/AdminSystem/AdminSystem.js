import { Outlet } from "react-router"
import { Container } from "reactstrap"
import HeaderContainer from "../../ui/Header/Header.container"

function AdminSystem(props) {

    return (
        <main>
            <div className="pageWrapper d-lg-flex">
                <div className="contentArea">
                    <HeaderContainer />
                    
                    <Container className="p-4 wrapper" fluid>
                        <Outlet />
                    </Container>
                </div>
            </div>
        </main>
    )
}

export default AdminSystem