import { useEffect, useRef, useState } from "react"
import StreamDetection from "./StreamDetection"
import * as faceapi from 'face-api.js';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUsers } from "../../../../store/usersReducer";
import { useNavigate } from "react-router";
import { URL } from "../../../../confige";

function StreamDetectionContainer(props) {

    let navigate = useNavigate()

    let goToUserInfo = (user) => {
        if (user.type == 'unknown') {
            navigate(`/admin/unknown-info/${user.id}`)
        }
        else {
            navigate(`/admin/user-info/${user.id}`)
        }
    }

    let url = URL

    const [human, setHuman] = useState(-2)
    const [humans, setHumans] = useState([])
    const [image, setImage] = useState('')
    const [scheduler, setScheduler] = useState([])

    let int;

    const dispatch = useDispatch()
    const users = useSelector(
        (state) => state.usersData.users
    )

    const userRef = useRef()
    userRef.current = users

    useEffect(
        () => {
            if (human == -1) {
                let user = {
                    photo: webcamRef.current.getScreenshot(),
                    type: 'unknown'
                }
                axios.post(`${url}/users`, user).then(
                    (res) => {
                        dispatch(setUsers([...users, { ...res.data }]))
                        let list = [
                            {
                                in: { ...getTime() },
                                out: {}
                            }
                        ]
                        let data = {
                            list
                        }
                        axios.post(`${url}/visits`, data).then(
                            (res) => {
                            }
                        )
                    }
                )
            }
            else if (human != -2) {
                if (humans.includes(human) == true) {
                    //todo: отправить запрос о том, что ушел
                    axios.get(`${url}/visits/${human}`).then(
                        (res) => {
                            let data = { ...res.data }
                            let list = data.list
                            let last = list[list.length - 1]
                            list[list.length - 1] = {
                                in: { ...last.in },
                                out: { ...getTime() }
                            }
                            data.list = [...list]
                            axios.put(`${url}/visits/${human}`, data).then(
                                (res) => {
                                    console.log('Добавлена запись об уходе')
                                    let newhumans = humans.filter(
                                        value => value != human
                                    )
                                    list = [...newhumans]
                                    data = {
                                        list
                                    }
                                    axios.put(`${url}/inbuild/0`, data).then(
                                        (res) => {
                                            setHumans([...res.data.list])
                                            dispatch(setUsers([...users]))
                                        }
                                    )
                                }
                            )
                        }
                    )
                }
                else {
                    // setHumans([...humans, human])
                    //todo: отправить запрос о том, что пришел
                    axios.get(`${url}/visits/${human}`).then(
                        (res) => {
                            let data = { ...res.data }
                            let list = data.list
                            let t = getTime()
                            list.push(
                                {
                                    in: { ...t },
                                    out: {}
                                }
                            )
                            data.list = [...list]
                            axios.put(`${url}/visits/${human}`, data).then(
                                (res) => {
                                    console.log('Добавлена запись о приходе')
                                    list = [...humans, human]
                                    data = {
                                        list
                                    }
                                    axios.put(`${url}/inbuild/0`, data).then(
                                        (res) => {
                                            setHumans([...res.data.list])
                                            scheduler.map(
                                                (value, index) => {
                                                    let s = value.start
                                                    let f = value.finish
                                                    if (
                                                        t.hour == s.hour && t.minutes > s.minutes ||
                                                        t.hour == f.hour && t.minutes < f.minutes ||
                                                        t.hour < f.hour && t.hour > s.hour
                                                    ) {
                                                        let data = {
                                                            userID: human,
                                                            time: t
                                                        }
                                                        axios.post(`${url}/later`, data).then(
                                                            (res) => {
                                                                console.log(res.data)
                                                                dispatch(setUsers([...users]))
                                                            }
                                                        )
                                                    }
                                                }
                                            )
                                        }
                                    )
                                }
                            )
                        }
                    )

                }
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
                findFace()
            })
            .catch(
                () => {
                    alert("Разрешите доступ в камере и перезагрузите страницу")
                }
            )
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
            axios.get(`${url}/scheduler`).then(
                (res) => {
                    setScheduler([...res.data])
                }
            )
            axios.get(`${url}/users`).then(
                (res) => {
                    axios.get(`${url}/inbuild/0`).then(
                        (res) => {
                            setHumans([...res.data.list])
                        }
                    )
                    Promise.all([
                        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
                        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
                        faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
                    ]).then(
                        async (data) => {
                            startVideo()
                            // console.log(webcamRef.current.srcObject)
                        }
                    )
                }
            )
            return (
                () => {
                    clearInterval(int)
                }
            )
        }, []
    )

    let loadInfo = () => {
        // console.log(userRef.current)
        if (userRef.current.length == 0) {
            return Promise.all([])
        }
        return Promise.all(
            userRef.current.map(
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
        int = setInterval(
            async () => {
                let img = document.createElement('img')
                img.src = webcamRef.current.getScreenshot()
                // dispatch(setUsers([...users]))
                loadInfo().then(
                    async (data) => {
                        if (data.length != 0) {
                            // console.log(data)
                            const faceMatcher = new faceapi.FaceMatcher(data, 0.6)
                            const det = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors()
                                .then(
                                    (det) => {
                                        // console.log(det)
                                        const result = det.map(
                                            (d) => faceMatcher.findBestMatch(d.descriptor)
                                        )
                                        // console.log(result)
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
                                                // console.log(result[0]._label)
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
        humans,
        image,
        users,
        goToUserInfo
    }

    return (
        <StreamDetection {...data} />
    )
}

export default StreamDetectionContainer