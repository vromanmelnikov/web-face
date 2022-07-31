// import { Alert } from "bootstrap"
import Webcam from "react-webcam"
import { Alert, Button, ButtonGroup, CardText } from "reactstrap"
import Class from './OldUser.module.css'

function OldUser(props) {

    return (
        <>
            {
                props.saved == false && props.newImage != '' &&
                <div className={`${Class.image_container} center`}>
                    <img src={props.newImage} id='img' />
                    <ButtonGroup>
                        <Button
                            color="primary"
                            className="btn mt-3"
                            onClick={props.savePhoto}
                        >
                            Сохранить фото
                        </Button>
                        <Button
                            className="btn mt-3"
                            onClick={props.retakePhoto}
                        >
                            Пересоздать и сохранить фото
                        </Button>
                    </ButtonGroup>
                </div>
            }
            {
                props.newImage == '' && props.saved == false &&
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
            }
            {
                props.saved == true
                    ?
                    <Alert color="success">Спасибо! Нажмите на уведомление, чтобы перейти в списку пользователей</Alert>
                    :
                    <>
                        <CardText className="mt-3" >Система распознавала Вас как:</CardText>
                        <CardText tag='h3'>{props.lastname} {props.firstname}</CardText>
                    </>
            }
        </>
    )
}

export default OldUser