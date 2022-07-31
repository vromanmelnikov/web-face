import { Button, Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap"

import draft from '../../../../../assets/images/users/user1.jpg'

function UserCard(props) {

    return (
        <Card>
            <CardImg src={draft}></CardImg>
            <CardBody className="p-4">
                <CardTitle tag="h5">{props.lastname} {props.firstname}</CardTitle>
                <CardText>{props.info}</CardText>
                <Button
                    color='primary'
                    onClick={props.goToUserInfo}
                >
                    Подробнее
                </Button>
            </CardBody>
        </Card>
    )
}

export default UserCard