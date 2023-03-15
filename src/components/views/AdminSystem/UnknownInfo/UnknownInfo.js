import { Link } from "react-router-dom"
import { Breadcrumb, BreadcrumbItem, Button, Card, CardBody, CardImg, CardText, CardTitle, Form, FormGroup, Progress, Table } from "reactstrap"
import draft from '../../../../assets/images/users/user1.jpg'
import Chart from "react-apexcharts";

import Class from './UnknownInfo.module.css'

function UnknownInfo(props) {

    return (
        <Card>
            <Breadcrumb className="m-3">
                <BreadcrumbItem>
                    <Link to="/admin/unknown-list">Неопознанные пользователи</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>{props.lastname} {props.firstname}</BreadcrumbItem>
            </Breadcrumb>
            <CardImg src={props.photo} className={`center ${Class.image}`}></CardImg>
            <Table bordered className={`${Class.table} center mb-4 mt-4`}>
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Пришел</th>
                        <th>Ушёл</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.allVisits.map(
                            (value, index) => {

                                let date = ''
                                let timeIn = ''
                                let timeOut = ''

                                if (Object.keys(value.in).length == 0) {
                                    date = '_._'
                                    timeIn = '-:-'
                                }
                                else {
                                    date = `${value.in.day < 10 ? `0${value.in.day}` : value.in.day}`
                                    date += `.${value.in.month < 9 ? `0${value.in.month + 1}` : value.in.month + 1}`
                                    let inH = `${value.in.hour < 10 ? `0${value.in.hour}` : value.in.hour}`
                                    let inM = `${value.in.minutes < 10 ? `0${value.in.minutes}` : value.in.minutes}`
                                    timeIn = `${inH}:${inM}`
                                }
                                if (Object.keys(value.out).length == 0) {
                                    date += ' - _._'
                                    timeOut = '-:-'
                                }
                                else {
                                    date += ` - ${value.out.day < 10 ? `0${value.out.day}` : value.out.day}`
                                    date += `.${value.out.month < 9 ? `0${value.out.month + 1}` : value.out.month + 1}`
                                    date += `.${value.out.year}`
                                    let outH = `${value.out.hour < 10 ? `0${value.out.hour}` : value.out.hour}`
                                    let outM = `${value.out.minutes < 10 ? `0${value.out.minutes}` : value.out.minutes}`
                                    timeOut = `${outH}:${outM}`
                                }

                                return (
                                    <tr key={index}>
                                        <th scope="row">{date}</th>
                                        <td>{timeIn}</td>
                                        <td>{timeOut}</td>
                                    </tr>
                                )
                            }
                        )
                    }
                </tbody>
            </Table>
            <Button color='danger' className="col-4 center mb-4" onClick={props.deleteUser}>Удалить пользователя</Button>

        </Card>
    )
}

export default UnknownInfo