import { Link } from "react-router-dom"
import { Breadcrumb, BreadcrumbItem, Button, Card, CardBody, CardImg, CardText, CardTitle, Form, FormGroup, Progress, Table } from "reactstrap"
import draft from '../../../../assets/images/users/user1.jpg'
import Chart from "react-apexcharts";

import Class from './UserInfo.module.css'

function UserInfo(props) {

    // const chartoptions = {
    //     series: [{
    //         data: [{
    //             x: 'TEAM A',
    //             y: [65, 96]
    //         },
    //         {
    //             x: 'TEAM B',
    //             y: [55, 78]
    //         },
    //         {
    //             x: 'TEAM C',
    //             y: [95, 186]
    //         }]
    //     }],
    //     options: {
    //         chart: {
    //             type: "rangeBar",
    //         },
    //         xaxis: {
    //             categories: [
    //                 "Jan",
    //                 "Feb",
    //                 "March",
    //                 "April",
    //                 "May",
    //                 "June",
    //                 "July",
    //                 "Aug",
    //             ],
    //         },
    //         inverseOrder: true,
    //     },
    // };

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
                    <>
                        <CardText tag="h4" className="center mb-3">{props.info}</CardText>
                        <input
                            type='date'
                            style={{ width: '90%' }}
                            className="center mb-2"
                            min={props.dateValue.min}
                            max={props.dateValue.max}
                            onChange={
                                props.onDateChange
                            }
                        />
                        <Button
                            color="primary"
                            className="col-5 center mb-4"
                            onClick={props.checkVisits}
                        >
                            Посмотреть посещаемость в этот день
                        </Button>

                        {
                            props.visits.length != 0 &&
                            <Table bordered className={`${Class.table} center mb-4`}>
                                <thead>
                                    <tr>
                                        <th>Начало</th>
                                        <th>Пришёл</th>
                                        <th>Статус</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.visits.map(
                                            (value, index) => {

                                                let start = { ...value.start }
                                                start = {
                                                    hour: `${start.hour < 10 ? `0${start.hour}` : start.hour}`,
                                                    minutes: `${start.minutes < 10 ? `0${start.minutes}` : start.minutes}`
                                                }

                                                let inV = { ...value.in }
                                                let time = ''
                                                if (inV.hour == undefined) {
                                                    time = '-'
                                                }
                                                else {
                                                    inV = {
                                                        hour: `${inV.hour < 10 ? `0${inV.hour}` : inV.hour}`,
                                                        minutes: `${inV.minutes < 10 ? `0${inV.minutes}` : inV.minutes}`
                                                    }
                                                    time = `${inV.hour}:${inV.minutes}`
                                                }

                                                return (
                                                    <tr key={index} className={`${value.type == 'Опоздал' && 'error'}`}>
                                                        <th scope="row">{start.hour}:{start.minutes}</th>
                                                        <td>{time}</td>
                                                        <td>{value.type}</td>
                                                    </tr>
                                                )
                                            }
                                        )
                                    }
                                </tbody>
                            </Table>
                        }
                        <CardText tag="h4" className="center mb-3">Вся посещаемость</CardText>
                        <Table bordered className={`${Class.table} center mb-4`}>
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

                    </>
            }
            {
                props.checked == false &&
                <Button color='success' className="col-4 center mb-3" onClick={props.checkUser}>Подтвердить пользователя</Button>
            }
            <Button color='danger' className="col-4 center mb-4" onClick={props.deleteUser}>Удалить пользователя</Button>

        </Card>
    )
}

export default UserInfo