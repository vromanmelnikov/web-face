import { Button, Card, CardBody, CardText, CardTitle, Col, Form, FormGroup, Input, Label, Row } from "reactstrap"

function Registration(props) {

    return (
        <>
            <CardTitle tag="h4" className="mt-3">Регистрация</CardTitle>
            <CardBody className="col-12">
                <Form
                    className="col-12"
                    onSubmit={props.onSubmit}
                >
                    {/* {
                        props.error == true &&
                        <CardText className="text-error">Неправильный логин или пароль!</CardText>
                    } */}
                    {
                        props.exError == true &&
                        <CardText className="text-error">Аккаунт с таким логином уже существует!</CardText>
                    }
                    <FormGroup className="col-8 center">
                        <Label for="login">Логин</Label>
                        <Input
                            id="login"
                            name="login"
                            placeholder=""
                            type="text"
                            className={`${props.exError == true && 'input-error'}`}
                        />
                    </FormGroup>
                    <FormGroup className="col-8 center">
                        <Label for="lastname">Фамилия</Label>
                        <Input
                            id="lastname"
                            name="lastname"
                            placeholder=""
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup className="col-8 center">
                        <Label for="firstname">Имя</Label>
                        <Input
                            id="firstname"
                            name="firstname"
                            placeholder=""
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup className="col-8 center">
                        <Label for="password">Пароль</Label>
                        <Input
                            id="password"
                            name="password"
                            placeholder=""
                            type="password"
                            className={`${props.error == true || props.passError == true ? 'input-error' : ''}`}
                            onChange={props.onPassChange_1}
                        />
                    </FormGroup>
                    <FormGroup className="col-8 center">
                        <Label for="password_2">Пароль</Label>
                        <Input
                            id="password_2"
                            name="password_2"
                            placeholder=""
                            type="password"
                            className={`${props.error == true || props.passError == true ? 'input-error' : ''}`}
                            onChange={props.onPassChange_2}
                        />
                    </FormGroup>
                    {
                        props.passError &&
                        <CardText className="text-error">Пароли не совпадают!</CardText>
                    }
                    <Button color="primary">
                        Войти
                    </Button>
                    <CardText className="mt-3">Уже есть аккаунт?
                        <Button
                            className="btn"
                            color="link"
                            onClick={props.goToLog}
                        >
                            Войдите
                        </Button>
                    </CardText>
                </Form>
            </CardBody>
        </>
    )
}

export default Registration