import Webcam from "react-webcam"
import { Card, CardHeader, CardText } from "reactstrap"

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
                <div>
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
                        <CardText tag='h3'>В камере {props.human}</CardText>
                    }
                </div>
            </div>
            <div>
                {
                    props.image != '' && 
                    <img src={props.image} />
                }
            </div>
        </Card>
    )
}

export default StreamDetection