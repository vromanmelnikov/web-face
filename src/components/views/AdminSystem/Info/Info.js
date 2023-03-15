import { Card, CardText, Table } from "reactstrap"

function Info(props) {

    return (
        <Card className="p-4">
            <CardText tag='h3' className='center mb-4'>Сейчас в помещении:</CardText>
            <Table bordered hover className={` center`}>
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Кто</th>
                        <th>Пришел</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.humans.map(
                            (value, index) => {

                                let iV = value.in

                                let day = `${iV.day < 10 ? `0${iV.day}` : `${iV.day}`}`
                                let month = `${iV.month < 10 ? `0${iV.month}` : `${iV.month}`}`

                                let hour = `${iV.hour < 10 ? `0${iV.hour}` : `${iV.hour}`}`
                                let min = `${iV.minutes < 10 ? `0${iV.minutes}` : `${iV.minutes}`}`

                                let date = `${day}.${month}.${iV.year}`
                                let time = `${hour}:${min}`

                                let info
                                if (value.type != 'unknown'){
                                    info = `${value.lastname} ${value.firstname}`
                                }
                                else {
                                    info = `Неопознанный пользователь ${value.id}`
                                }

                                return (
                                    <tr
                                        key={index}
                                        onClick={
                                            () => {
                                                props.goToUserInfo(value)   
                                            }
                                        }
                                    >
                                        <th>{date}</th>
                                        <td>{info}</td>
                                        <td>{time}</td>
                                    </tr>
                                )
                            }
                        )
                    }
                </tbody>
            </Table>
        </Card>
    )
}

export default Info