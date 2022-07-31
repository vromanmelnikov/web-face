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
            <CardImg src={props.photo} className={`center ${Class.image}`}></CardImg>
            <CardText tag="h2" className="center mb-3 mt-3">{props.lastname} {props.firstname}</CardText>
            {
                props.info == ''
                    ?
                    <Button color='primary' className="col-6 center mb-3" onClick={props.showInfo}>Показать информацию</Button>
                    :
                    <CardText tag="h4" className="center mb-3">{props.info}</CardText>
            }
            {/* <CardText tag="h4" className="center mb-2">Функции:</CardText> */}
            {
                props.checked == false &&
                <Button color='success' className="col-4 center mb-3" onClick={props.checkUser}>Подтвердить пользователя</Button>
            }
            <Button color='danger' className="col-4 center mb-4" onClick={props.deleteUser}>Удалить пользователя</Button>

        </Card>
    )
}

export default UserInfo