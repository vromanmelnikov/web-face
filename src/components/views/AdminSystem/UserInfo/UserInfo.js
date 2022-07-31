import { Link } from "react-router-dom"
import { Breadcrumb, BreadcrumbItem, Button, Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap"
import draft from '../../../../assets/images/users/user1.jpg'

import Class from './UserInfo.module.css'

function UserInfo(props) {

    return (
        <Card>
            <Breadcrumb className="m-3">
                <BreadcrumbItem>
                    <Link to="/admin/user-list">Пользователи</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>{props.lastname} {props.firstname}</BreadcrumbItem>
            </Breadcrumb>
            <CardImg src={draft} className={`center ${Class.image}`}></CardImg>
            <CardBody className="p-4">
                <CardText tag="h2">{props.lastname} {props.firstname}</CardText>

                <CardText tag="h4">{props.info}</CardText>
            </CardBody>
        </Card>
    )
}

export default UserInfo