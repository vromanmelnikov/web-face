import { Button, Card, CardBody, CardText, CardTitle, Col, Form, FormGroup, Input, Label, Row } from "reactstrap"

function Login(props) {

    return (
        <>
            <CardTitle tag="h4" className="mt-3">Авторизация</CardTitle>
            <CardBody className="col-12">
                <Form
                    className="col-12"
                    onSubmit={props.onSubmit}
                >
                    {
                        props.error == true &&
                        <CardText className="text-error">Неправильный логин или пароль!</CardText>
                    }
                    <FormGroup className="col-8 center">
                        <Label for="login">Логин</Label>
                        <Input
                            id="login"
                            name="login"
                            placeholder=""
                            type="text"
                            className={`${props.error == true && 'input-error'}`}
                        />
                    </FormGroup>
                    <FormGroup className="col-8 center">
                        <Label for="password">Пароль</Label>
                        <Input
                            id="password"
                            name="password"
                            placeholder=""
                            type="password"
                            className={`${props.error == true && 'input-error'}`}
                        />
                    </FormGroup>
                    <Button color="primary">Войти</Button>
                    <CardText className="mt-3">Вас ещё нет в системе?
                        <Button 
                            className="btn" 
                            color="link"
                            onClick={props.goToReg}
                        >
                            Зарегистрируйтесь
                        </Button>
                    </CardText>
                </Form>
            </CardBody>
        </>
    )
}

export default Login