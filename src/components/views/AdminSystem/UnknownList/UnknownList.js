import { Button, ButtonGroup, Col, FormGroup, Input, Label, Row } from "reactstrap"
import UserCardContainer from "./UserCard/UserCard.container"

import Class from './UnknownList.module.css'

function UnknownList(props) {

    return (
        <div>
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

export default UnknownList