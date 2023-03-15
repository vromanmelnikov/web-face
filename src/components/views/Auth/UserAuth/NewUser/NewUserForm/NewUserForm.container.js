import axios from "axios"
import { useEffect, useState } from "react"
import { URL } from "../../../../../../confige"
import NewUserForm from "./NewUserForm"

function NewUserFormContainer(props) {

    let url = URL

    const [type, setType] = useState(1)
    const [infoValue, setInfoValue] = useState('')
    const [info, setInfo] = useState([])
    const [infoType, setInfoType] = useState('')

    const [error, setError] = useState(false)
    const [saved, setSaved] = useState(false)

    let onSubmit = (event) => {
        event.preventDefault()
        let target = event.target
        let lastname = target[0].value
        let firstname = target[1].value
        let type = parseInt(target[2].value)
        let info = target[3].value
        if (lastname == '' || firstname == '' || info == '') {
            setError(true)
        }
        else {

            let typeFlag = type == 1
            let info_name = typeFlag ? 'group' : 'subject'

            let user = {
                lastname,
                firstname,
                type: typeFlag ? 'student' : 'teacher',
                [info_name]: info,
                photo: props.image,
                checked: false
            }

            let un = props.unknown
            // console.log(un)

            if (un != null) {
                axios.put(`${url}/users/${un.id}`, user).then(
                    (res) => {
                        // console.log(res)
                        setSaved(true)
                    }
                )
            }
            else {
                axios.post(`${url}/users`, user).then(
                    (res) => {
                        // console.log(res)
                        axios.post(`${url}/visits`, {list:[]}).then(
                            res => {
                                setSaved(true)
                            }
                        )
                    }
                )
            }
        }
    }

    let onTypeChange = (event) => {
        let value = event.target.value
        setType(value)
    }

    let onInfoChange = (event) => {
        // console.log(event)
        setInfoValue(event.target.value)
    }

    useEffect(
        () => {
            let req = type == 1 ? 'groups' : 'subjects'
            setInfoType(type == 1 ? 'вашу группу' : 'ваш предмет')
            let zero = {
                id: -1,
                name: 'Не выбрано'
            }
            // axios.get(`${url}/${req}`).then(
            //     res => {
            //         let data = res.data
            //         setInfo([zero, ...data])
            //     }
            // )
        }, [type]
    )

    let data = {
        onSubmit,
        type,
        onTypeChange,
        info,
        infoType,
        onInfoChange,
        infoValue,
        error,
        saved,
        goToUserList: props.goToUserList
    }

    return (
        <NewUserForm {...data} />
    )
}

export default NewUserFormContainer