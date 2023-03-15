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
                    <CardText className="mt-3 mb-0" >Вы можете сохранить старое или новое фото, а также перезаписать текущее:</CardText>
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
                    <>
                        <Alert color="success">Фото успешно сохранено!</Alert>
                    </>
                    :
                    <>
                        <CardText tag='h5' className="mt-3 mb-0" >Система распознавала Вас как:</CardText>
                        <CardText tag='h3'>{props.lastname} {props.firstname}</CardText>
                        <Button color="success" className="col-6 center mb-3" onClick={props.saveOld}>Сохранить старое фото</Button>
                        <br />
                    </>
            }

            <Button color="info" className="col-6 center" onClick={props.newReg}>Перейти к началу регистрации</Button>
        </>
    )
}

export default OldUser