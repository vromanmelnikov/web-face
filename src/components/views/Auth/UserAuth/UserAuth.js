import Webcam from "react-webcam";
import { Button, ButtonGroup, Card, CardBody, CardImg, CardTitle, Col, Container, Row } from "reactstrap";
import NewUserContainer from "./NewUser/NewUser.container";
import OldUserContainer from "./OldUser/OldUser.container";

import Class from './UserAuth.module.css'

function UserAuth(props) {



    return (
        <Container className="p-4">
            <Row>
                <Col lg="12">
                    <Card body className="text-center">
                        <CardTitle tag="h4">Регистрация в системе</CardTitle>
                        {
                            props.oldUser == null && props.newUser == false
                                ?
                                <CardBody>
                                    {
                                        props.image == ''
                                            ?
                                            <div className={`${Class.webcam_container} center`}>
                                                <Webcam
                                                    audio={false}
                                                    autoPlay
                                                    ref={props.webcamRef}
                                                    screenshotFormat='image/png'
                                                    videoConstraints={{
                                                        facingMode: "user"
                                                    }}
                                                />
                                                <Button
                                                    color="primary"
                                                    className="btn mt-3"
                                                    onClick={props.takePhoto}
                                                >
                                                    Зафиксировать фото
                                                </Button>
                                            </div>
                                            :
                                            <div className={`${Class.image_container} center`}>
                                                <img src={props.image} id='img' />
                                                <ButtonGroup>
                                                    <Button
                                                        color="primary"
                                                        className="btn mt-3"
                                                        onClick={props.savePhoto}
                                                    >
                                                        Использовать фото
                                                    </Button>
                                                    <Button
                                                        className="btn mt-3"
                                                        onClick={props.retakePhoto}
                                                    >
                                                        Пересоздать фото
                                                    </Button>
                                                </ButtonGroup>

                                            </div>
                                    }
                                </CardBody>
                                :
                                <></>
                        }
                        {
                            props.oldUser != null &&
                            <CardBody>
                                <OldUserContainer
                                    user={props.oldUser}
                                    image={props.image}
                                    newReg={props.newReg}
                                    goToUserList={props.goToUserList}
                                />
                            </CardBody>
                        }
                        {
                            props.newUser != false &&
                            <CardBody>
                                <NewUserContainer 
                                    image={props.image}
                                    newReg={props.newReg}
                                    goToUserList={props.goToUserList}
                                />
                            </CardBody>
                        }
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default UserAuth