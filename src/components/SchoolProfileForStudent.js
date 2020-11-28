import React from 'react'
import avatar from '@/css/images/profile/avatar.svg'

const types = new Map([
    ["HIGH_SCHOOL_STUDENT", "Старшеклассник"],
    ["APPLICANT", "Абитуриент"],
    ["STUDENT", "Студент"]
]);

const SchoolProfileForStudent = (props) => {
    const user = props.user;
    return(
        <div className="profile">
            <div className="profile__avatar">
                <img src={avatar} alt='avatar'/>
            </div>
            <div className="profile__name">
                <span className="profile__fio">{user.second_name} {user.first_name}</span>
                <span className="profile__membership post">{types.get(user.user_type)}</span>
                <span className="profile__university post">
                    {
                        user.subjects &&
                            user.subjects.map(subject => subject.name)
                    }
                </span>
            </div>
            <div className="profile__status">
                <p>{user.description ? user.description : ''}</p>
            </div>
            <div className="profile__services services">
                <span className="suggestion">{user.first_name} интересуется:</span>
                <div className="services__list">
                    <ul>
                        {
                            user.services &&
                                user.services.map(service =>
                                    <li key={service.id}>
                                        {service.name}
                                    </li>
                                )
                        }
                        {/*<li className="services__enum">Занятия по подготовке к ЕГЭ по профильной математике</li>*/}
                        {/*<li className="services__enum">Занятия по подготовке к ЕГЭ по физике</li>*/}
                        {/*<li className="services__enum">Консультация по физическим направлениям в Бауманке</li>*/}
                    </ul>
                </div>
                <button className="profile__sending" type="submit">Отправить заявку</button>
            </div>

        </div>
    );
}

export default SchoolProfileForStudent