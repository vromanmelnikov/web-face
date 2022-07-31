import { Alert, Button, CardText, Form, FormGroup, Input, Label } from "reactstrap"

function NewUserForm(props) {

    return (
        <>
            {
                props.error == true &&
                <CardText className="text-error">Неправильный логин или пароль!</CardText>
            }
            {
                props.saved == false
                    ?
                    <Form onSubmit={props.onSubmit}>
                        <FormGroup className="col-8 center">
                            <Label for="lastname">Фамилия</Label>
                            <Input
                                id="lastname"
                                name="lastname"
                                placeholder=""
                                type="text"
                                className={`${props.error == true && 'input-error'}`}
                            />
                        </FormGroup>
                        <FormGroup className="col-8 center">
                            <Label for="firstname">Имя</Label>
                            <Input
                                id="firstname"
                                name="firstname"
                                placeholder=""
                                type="text"
                                className={`${props.error == true && 'input-error'}`}
                            />
                        </FormGroup>
                        <FormGroup className="col-8 center">
                            <Label for="type">Ваша должность</Label>
                            <Input
                                id="type"
                                name="type"
                                placeholder=""
                                type="select"
                                value={props.type}
                                onChange={props.onTypeChange}
                            >
                                <option value={1}>Студент</option>
                                <option value={2}>Преподаватель</option>
                            </Input>
                        </FormGroup>
                        <FormGroup className="col-8 center">
                            <Label for="info-value">Введите {props.infoType}:</Label>
                            <Input
                                id="info-value"
                                name="info-value"
                                placeholder=""
                                type="text"
                                value={props.infoValue}
                                onChange={props.onInfoChange}
                                className={`${props.error == true && 'input-error'}`}
                            />
                        </FormGroup>
                        {
                            props.info.length != 0 &&
                            <FormGroup className="col-8 center">
                                <Label for="info">или выберите из предложенных:</Label>
                                <Input
                                    id="info"
                                    name="info"
                                    placeholder=""
                                    type="select"
                                    value={props.type}
                                    onChange={props.onInfoChange}
                                >
                                    {
                                        props.info.map(
                                            (value, index) => {
                                                return (
                                                    <option value={value.name} key={index}>{value.name}</option>
                                                )
                                            }
                                        )
                                    }
                                </Input>
                            </FormGroup>
                        }
                        <Button color="primary" className="">Войти</Button>
                    </Form>
                    :
                    <>
                        <Alert color="success">Успешная регистрация!</Alert>
                        <Button color="primary" className="col-6 center " onClick={props.goToUserList}>Перейти в списку пользователей</Button><br />
                    </>
            }
        </>
    )
}

export default NewUserForm