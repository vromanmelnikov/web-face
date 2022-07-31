import { useEffect, useRef, useState } from "react"
import StreamDetection from "./StreamDetection"
import * as faceapi from 'face-api.js';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUsers } from "../../../../store/usersReducer";

function StreamDetectionContainer(props) {

    let url = 'http://localhost:3000'

    const [human, setHuman] = useState(-2)
    const [image, setImage] = useState('')

    const dispatch = useDispatch()
    let users = useSelector(
        (state) => state.usersData.users
    )

    useEffect(
        () => {
            if (human == -1) {
                let curr = { ...getTime() }
                let user = {
                    photo: webcamRef.current.getScreenshot(),
                    type: 'unknown'
                }
                axios.post(`${url}/users`, user).then(
                    (res) => {
                        dispatch(setUsers([...users, {...res.data}]))
                    }
                )
            }
            else if (human != -2) {

            }
        }, [human]
    )

    let time = new Date()

    const webcamRef = useRef()

    

    let startVideo = () => {
        navigator.mediaDevices.getUserMedia({
            video: true
        })
            .then(stream => {
                webcamRef.current.srcObject = stream
            })
    }

    let getTime = () => {
        let curr = {
            day: time.getDate(),
            month: time.getMonth(),
            year: time.getFullYear(),
            hour: time.getHours(),
            minutes: time.getMinutes()
        }
        return curr
    }

    useEffect(
        () => {
            Promise.all([
                faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
                faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
                faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
            ]).then(
                async (data) => {
                    loadInfo().then(
                        (data) => {
                            console.log(data)
                            startVideo()
                            findFace()
                        }
                    )
                }
            )
        }, [null, users]
    )

    const loadInfo = () => {
        if (users.length == 0) {
            return Promise.all([])
        }
        return Promise.all(
            users.map(
                async (user) => {
                    let descriptions = []
                    const img = await faceapi.fetchImage(user.photo)
                    const detections = await faceapi
                        .detectSingleFace(img)
                        .withFaceLandmarks()
                        .withFaceDescriptor()
                    descriptions.push(detections?.descriptor)

                    let info = `${user.id}`
                    return new faceapi.LabeledFaceDescriptors(info, descriptions)
                }
            )
        )
    }

    let findFace = async () => {
        setInterval(
            async () => {
                let img = document.createElement('img')
                img.src = webcamRef.current.getScreenshot()
                const load = await loadInfo().then(
                    async (data) => {
                        if (data.length != 0) {
                            console.log(data)
                            const faceMatcher = new faceapi.FaceMatcher(data, 0.6)
                            const det = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors()
                                .then(
                                    (det) => {
                                        console.log(det)
                                        const result = det.map(
                                            (d) => faceMatcher.findBestMatch(d.descriptor)
                                        )
                                        if (result[0] == undefined) {
                                            console.log('Лицо не обнаружено')
                                            setHuman(-2)
                                        }
                                        else {
                                            if (result[0]._label == "unknown") {
                                                console.log('Лицо не распознано')
                                                setHuman(-1)
                                            }
                                            else {
                                                console.log(result[0]._label)
                                                let id = parseInt(result[0]._label)
                                                setHuman(id)
                                            }
                                        }
                                    }
                                )
                        }
                        else {
                            // setNewUser(true)
                        }
                    }
                )
            }, 3000
        )
    }

    let data = {
        webcamRef,
        human,
        image
    }

    return (
        <StreamDetection {...data} />
    )
}

export default StreamDetectionContainer