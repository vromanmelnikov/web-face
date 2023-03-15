import Webcam from "react-webcam"
import { Card, CardHeader, CardText, Table } from "reactstrap"

import Class from './StreamDetection.module.css'

function StreamDetection(props) {

    return (
        <Card className="p-4">
            <CardText tag='h2' className='center mb-3'>Потоковое распознавание лица</CardText>
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
                <div className={`${Class.info}`}>
                    {
                        props.human == -2 &&
                        <CardText tag='h3'>В камере нет людей</CardText>
                    }
                    {
                        props.human == -1 &&
                        <CardText tag='h3'>В камере неопознанный человек</CardText>
                    }
                    {
                        props.human != -2 && props.human != -1 &&
                        <CardText tag='h3'>В камере есть человек</CardText>
                    }
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>Кто находится в здании:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.humans.map(
                                    (value, index) => {

                                        let user = props.users.filter(
                                            elem => elem.id == value
                                        )[0]

                                        if (user != undefined) {
                                            return (
                                                <tr 
                                                    key={index}
                                                    onClick={
                                                        () => {
                                                            props.goToUserInfo(user)
                                                        }
                                                    }
                                                >
                                                    <td>
                                                        {
                                                            user.type == 'unknown'
                                                                ?
                                                                `Неопознанный пользователь ${user.id}`
                                                                :
                                                                `${user.lastname} ${user.firstname}`
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    }
                                )
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </Card>
    )
}

export default StreamDetection