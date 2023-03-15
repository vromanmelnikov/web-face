import { Button, ButtonGroup, Col, FormGroup, Input, Label, Row } from "reactstrap"
import UserCardContainer from "./UserCard/UserCard.container"

import Class from './UserList.module.css'

function UserList(props) {

    return (
        <div>
            <Row>
                <ButtonGroup className="mb-3 col-6 ">
                    <Button
                        color="primary"
                        onClick={() => props.changeCheck(true)}
                        active={props.checked === true}
                    >
                        Проверенные
                    </Button>
                    <Button
                        color="primary"
                        onClick={() => props.changeCheck(false)}
                        active={props.checked === false}
                    >
                        Непроверенные
                    </Button>
                </ButtonGroup>
            </Row>
            <Row>
                {
                    props.users.length == 0 &&
                    <h1 className="center">Не найдено пользователей</h1>
                }
                {
                    props.users.map(
                        (value, index) => {
                            return (
                                <Col sm="6" lg="6" xl="3" key={index}>
                                    <UserCardContainer user={value} />
                                </Col>
                            )
                        }
                    )
                }
            </Row>
        </div>
    )
}

export default UserList