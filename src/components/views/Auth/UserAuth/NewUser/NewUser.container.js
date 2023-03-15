import axios from "axios"
import { useCallback, useEffect, useRef, useState } from "react"
import NewUser from "./NewUser"
import {URL} from '../../../../../confige'

function NewUserContainer (props) {

    console.log(props)

    let url = URL

    const webcamRef = useRef()

    const [saved, setSaved] = useState(false)
    const [retaked, setRetaked] = useState(false)
    const [newImage, setNewImage] = useState('')

    let savePhoto = () => {
        setSaved(true)
    }

    let retakePhoto = () => {
        setNewImage('')
    }

    const takePhoto = useCallback(
        () => {
            let photo = webcamRef.current.getScreenshot()
            setNewImage(photo)
        }, [webcamRef]
    )

    useEffect(
        () => {
            setNewImage(props.image)
        }, [props.image]
    )

    let data = {
        // ...props.user,
        image: props.image,
        saved,
        savePhoto,
        webcamRef,
        retaked,
        newImage,
        retakePhoto,
        takePhoto,
        newReg: props.newReg,
        goToUserList: props.goToUserList,
        unknown: props.unknown
    }

    return(
        <NewUser {...data}/>
    )
}

export default NewUserContainer