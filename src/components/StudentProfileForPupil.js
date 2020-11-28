import React from 'react'
import avatar from '../css/images/profile/avatar.svg'

import '../css/studentProfileForPupil.css'

const types = new Map([
    ["HIGH_SCHOOL_STUDENT", "Старшеклассник"],
    ["APPLICANT", "Абитуриент"],
    ["STUDENT", "Студент"]
]);

const StudentProfileForPupil = (props) => {
    const user = props.user;
    const uni = user.uni ? user.uni.name : 'Университет';
    const spec = user.specialization ? user.specialization.name : 'Специализация';

    return(
        <div className="profile">
            <div className="profile__avatar">
                <img src={avatar} alt='avatar'/>
            </div>
            <div className="profile__name">
                <span className="profile__fio">{user.second_name} {user.first_name}</span>
                <span className="profile__membership post">{types.get(user.user_type)}</span>
                <span className="profile__university post">{uni}, {spec}</span>
            </div>
            <div className="profile__status">
                <p>{user.description ? user.description : ''}</p>
            </div>
            <div className="profile__services services">
                <span className="suggestion">{user.first_name} предлагает:</span>
                {user.services &&
                    user.services.map(service =>
                        <p key={service.id} className='profile__radio'>
                            <input id={service.id} type='radio' name='radio' value={service.name}/>
                            <label htmlFor={service.id}>{service.name} - {service.price}</label>
                        </p>
                    )
                }
                <button className="profile__sending" type="submit">Отправить заявку</button>
            </div>
        </div>
    );
}

export default StudentProfileForPupil