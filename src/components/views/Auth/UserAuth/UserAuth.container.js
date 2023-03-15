import { useCallback, useEffect, useRef, useState } from "react"
import UserAuth from "./UserAuth"

import * as faceapi from 'face-api.js';
import { useSelector } from "react-redux";

import axios from "axios"
import { useDispatch } from "react-redux"
import { setUsers } from "../../../../store/usersReducer"
import React from "react";
import { useNavigate } from "react-router";
import { URL } from '../../../../confige'

function UserAuthContainer(props) {

    let navigate = useNavigate()

    const url = URL
    const dispatch = useDispatch()

    let users = useSelector(
        (state) => state.usersData.users
    )

    const webcamRef = useRef()

    const [image, setImage] = useState('')
    const [newUser, setNewUser] = useState(false)
    const [oldUser, setOldUser] = useState(null)
    const [unknown, setUnknown] = useState(null)

    const takePhoto = useCallback(
        () => {
            let photo = webcamRef.current.getScreenshot()
            setImage(photo)
        }, [webcamRef]
    )

    let startVideo = () => {
        navigator.mediaDevices.getUserMedia({
            video: true
        })
            .then(stream => {
                webcamRef.current.srcObject = stream
            })
    }

    let retakePhoto = () => {
        setImage('')
    }

    let savePhoto = () => {
        findFace()
    }

    useEffect(
        () => {
            axios.get(`${url}/users`).then(
                (res) => {
                    // console.log()
                    dispatch(setUsers([...res.data]))
                    Promise.all([,
                        faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
                        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
                        faceapi.nets.faceLandmark68Net.loadFromUri('/models')
                    ]).then(
                        (data) => {
                            startVideo()
                        }
                    )
                }
            )

        }, []
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
                    // descriptions.push()
                    descriptions.push(new Float32Array(detections?.descriptor))

                    let info = `${user.id}`
                    return new faceapi.LabeledFaceDescriptors(info, descriptions)
                }
            )
        )
    }

    let findFace = async () => {
        let img = document.createElement('img')
        img.src = image
        loadInfo().then(
            async (data) => {
                if (data.length != 0) {
                    console.log(data)
                    const faceMatcher = new faceapi.FaceMatcher(data, 0.6)
                    faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors()
                        .then(
                            (det) => {
                                // console.log(det)
                                const result = det.map(
                                    (d) => faceMatcher.findBestMatch(d.descriptor)
                                )
                                if (result[0] == undefined) {
                                    console.log('Не распознано')
                                }
                                else {
                                    if (result[0]._label == "unknown") {
                                        setNewUser(true)
                                    }
                                    else {
                                        let id = result[0]._label
                                        let user = users.filter(user => user.id == parseInt(id))[0]
                                        setOldUser({ ...user })
                                    }
                                }
                            }
                        )
                }
                else {
                    setNewUser(true)
                }
            }
        )
    }

    let newReg = () => {
        setOldUser(null)
        setNewUser(false)
        setImage('')
    }

    let goToUserList = () => {
        navigate('/admin/user-list')
    }

    let data = {
        webcamRef,
        image,
        takePhoto,
        retakePhoto,
        savePhoto,
        oldUser,
        newUser,
        newReg,
        goToUserList,
        unknown,
        setUnknown,
        setNewUser,
        setOldUser
    }

    return (
        <UserAuth {...data} />
    )
}

export default UserAuthContainer