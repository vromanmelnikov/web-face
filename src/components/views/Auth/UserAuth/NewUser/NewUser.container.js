import axios from "axios"
import { useCallback, useEffect, useRef, useState } from "react"
import OldUser from "./NewUser"

function OldUserContainer (props) {

    let url = 'http://localhost:3000'

    const webcamRef = useRef()

    const [saved, setSaved] = useState(false)
    const [retaked, setRetaked] = useState(false)
    const [newImage, setNewImage] = useState('')

    let savePhoto = () => {
        setSaved(true)
        let user = {
            ...props.user,
            photo: newImage
        }
        axios.put(`${url}/users/${user.id}`, user).then(
            (res) => {
                console.log(res)
            }
        )
    }

    let retakePhoto = () => {
        // setRetaked(true)
        setNewImage('')
    }

    const takePhoto = useCallback(
        () => {
            //@ts-ignore
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
        ...props.user,
        image: props.image,
        saved,
        savePhoto,
        webcamRef,
        retaked,
        newImage,
        retakePhoto,
        takePhoto
    }

    return(
        <OldUser {...data}/>
    )
}

export default OldUserContainer