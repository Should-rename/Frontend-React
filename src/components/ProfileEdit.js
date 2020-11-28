import React, {useState, useEffect} from 'react'

import '../css/profileEditInfo.css'
import '../css/profileEditPrice.css'

import avatar from '../css/images/profile/avatar.svg'
import add from '../css/images/profile/add.svg'
import deleteBtn from '../css/images/profile/delete.svg'

const ProfileEdit = (props) => {
    const [first_name, setFirstName] = useState(`${props.currentUser.first_name}`);
    const [second_name, setSecondName] = useState(`${props.currentUser.second_name}`);
    const [third_name, setThirdName] = useState(`${props.currentUser.third_name}`);
    const [user_type, setUserType] = useState(`${props.currentUser.user_type}`);
    const [uni, setUni] = useState(`${props.currentUser.uni ? props.currentUser.uni.name : null}`);
    const [specialization, setSpecialization] = useState(`${props.currentUser.specialization ? props.currentUser.specialization.name : null}`);
    const [description, setDescription] = useState(`${props.currentUser.description}`);

    const token = localStorage.Authentication;

    const dropDownList = () => {

    }


    // let services = [
    //     {
    //         name: 'Занятия по математике',
    //         price: 1000
    //     },
    //     {
    //         name: 'Занятия по физике',
    //         price: 2000
    //     },
    //     {
    //         name: 'Занятия по программированию',
    //         price: 3000
    //     }
    // ];

    const priceTable = props.currentUser.services.map((service) =>
        <tr key={service.name+service.price+Math.random()}>
            <td className='price-table__column-1'>{service.name}</td>
            <td className='price-table__column-2'>{service.price}</td>
            <td className='price-table__column-3'>
                <img src={deleteBtn} alt='delete' onClick={(event) => deleteService(event)}/>
            </td>
        </tr>
    )

    const updateCurrentUser = () => {
        fetch('http://localhost:8080/current_user', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.message) {
                    //недействительный токен
                    localStorage.removeItem('Authentication');
                } else {
                    props.setCurrentUser(data);
                }
            })
    }

    const addService = event => {
        let name = event.currentTarget.parentElement.previousElementSibling.previousElementSibling.innerHTML;
        let price = event.currentTarget.parentElement.previousElementSibling.innerHTML;
        fetch(`http://localhost:8080/users/${props.currentUser.id}/add_service`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                price
            })
        })
            .then(response => {
                if (response.ok) {
                    updateCurrentUser();
                } else {
                    console.log('ERR', response);
                }
            })
    }

    const deleteService = event => {
        let td = event.currentTarget.parentElement.previousElementSibling.previousElementSibling;
        let serviceName = td.innerHTML;

        fetch(`http://localhost:8080/users/${props.currentUser.id}/delete_service/${serviceName}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.ok) {
                    updateCurrentUser();
                } else {
                    console.log('ERR', response)
                }
            })
    }

    //subjects
    // const [avatar_file, setAvatar] = useState('');

    const setNewUserType = () => {
        const types = document.getElementsByClassName('userType');
        let type;
        for (let i = 0; i < types.length; ++i) {
            if (types[i].checked) {
                type = types[i].value;
            }
        }
        setUserType(type);
    }

    const submit = event => {
        event.preventDefault();
        fetch(`http://localhost:8080/users/${props.currentUser.id}/edit`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                user_type,
                first_name,
                second_name,
                third_name,
                uni: {name: uni},
                specialization: {name: specialization, number: null},
                description
            })
        })
            .then(response => {
                if (response.ok) {
                    updateCurrentUser();
                } else {
                    console.log('ERR', response)
                }
            })
    }

    return (
        <div className="profile-edit">

            <div className="profile-edit__main-info">
                <div className="profile-edit__avatar">
                    <img src={avatar} alt='avatar'/>

                        <div className="profile-edit__avatar__add">
                            <img src={add} alt='add'/>
                        </div>
                </div>

                <div className="person-info">
                    <div className="person-info__column-1">
                        <div className="person-info__first-name input-field">
                            ИМЯ
                            <input
                                className="input-info"
                                type="text"
                                size="40"
                                onChange={event => setFirstName(event.target.value)}
                            />
                        </div>
                        <div className="person-info__last-name input-field">
                            ФАМИЛИЯ
                            <input
                                className="input-info"
                                type="text"
                                size="40"
                                onChange={event => setSecondName(event.target.value)}
                            />
                        </div>
                        <div className="person-info__middle-name input-field">
                            ОТЧЕСТВО
                            <input
                                className="input-info"
                                type="text"
                                size="40"
                                onChange={event => setThirdName(event.target.value)}
                            />
                        </div>
                        <div className="person-info__university input-field">
                            ВУЗ
                            <input
                                className="input-info"
                                type="text"
                                placeholder="Например: МГУ, СПБГУ"
                                size="40"
                                onChange={event => setUni(event.target.value)}
                            />
                        </div>
                        <div className="person-info__direction input-field">
                            НАПРАВЛЕНИЕ
                            <input
                                className="input-info"
                                type="text"
                                placeholder="Например: 38.03.01, Экономика, Химия"
                                size="40"
                                onChange={event => setSpecialization(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="person-info__column-2">
                        <div className="person-info__post">
                            <p className="profile-edit__radio">
                                <input
                                    id="radio-1"
                                    type="radio"
                                    name="radio"
                                    value="HIGH_SCHOOL_STUDENT"
                                    className='userType'
                                    onChange={() => setNewUserType()}
                                />
                                <label htmlFor="radio-1">СТАРШЕКЛАССНИК</label>
                            </p>
                            <p className="profile-edit__radio">
                                <input
                                    id="radio-2"
                                    type="radio"
                                    name="radio"
                                    value="APPLICANT"
                                    className='userType'
                                    onChange={() => setNewUserType()}
                                />
                                <label htmlFor="radio-2">АБИТУРИЕНТ</label>
                            </p>
                            <p className="profile-edit__radio">
                                <input
                                    id="radio-3"
                                    type="radio"
                                    name="radio"
                                    value="STUDENT"
                                    className='userType'
                                    defaultChecked
                                    onChange={() => setNewUserType()}
                                />
                                <label htmlFor="radio-3">СТУДЕНТ</label>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hello-message">
                <p>ПРИВЕТСТВЕННОЕ СООБЩЕНИЕ</p>
                <input
                    className="message-field"
                    type="text"
                    onChange={event => setDescription(event.target.value)}
                />
            </div>
            <div className="price-list">
                <p>ПРАЙС-ЛИСТ</p>

                <table className='price-table'>
                    <tbody>
                        <tr>
                            <th className="price-table__column-1 title">услуга</th>
                            <th className="price-table__column-2 title">стоимость</th>
                        </tr>

                        {props.currentUser.services && priceTable}

                        <tr>
                            <td className="price-table__column-1" contentEditable='true'> </td>
                            <td className="price-table__column-2" contentEditable='true'> </td>
                            <td className='price-table__column-3'>
                                <img
                                    src={add}
                                    alt='add'
                                    onClick={event => addService(event)}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <div className="subjects">
                <p>ПРЕДМЕТЫ ИЗУЧЕНИЯ
                    <input
                        className="subjects__field"
                        type="text"
                        size="40"
                        onClick={dropDownList}
                    />
                </p>
            </div>
            <div className='btns'>
                <button className="delete__button" type="submit">
                    <span className="delete">Удалить профиль</span>
                </button>
                <button className="save__button" type="submit" onClick={submit}>
                    <span className="post">Сохранить изменения</span>
                </button>
            </div>
        </div>
    );
}

export default ProfileEdit