import { Button, Card, CardText, CardTitle, Col, Container, Row } from 'reactstrap'
import Class from './Auth.module.css'

function Auth(props) {

    return (
        <Container className="p-4">
            <Row>
                <Col lg="12" className={`${Class.block}`}>
                    <Card body className="text-center">
                        <CardTitle tag="h5">Регистрация в системе</CardTitle>
                        <CardText>
                            Зарегистрируйтесь в системе для распознавания
                        </CardText>
                        <div className={`${Class.btn_group}`}>
                            <Button 
                                className="btn" 
                                color="primary" 
                                size="lg"
                                onClick={props.goToUserAuth}
                            >
                                Регистрация
                            </Button>
                            <Button
                                className="btn"
                                color="success"
                                size="lg"
                                onClick={props.goToAdminAuth}
                            >
                                Вход для администратора
                            </Button>
                        </div>

                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Auth