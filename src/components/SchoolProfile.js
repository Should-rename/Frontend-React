import React, {Fragment} from 'react'

import '../css/schoolProfile.css'

const SchoolProfile = (props) => {
    return (
        <Fragment>
            {/*<span className="profile__university post">Что за рандомный перечень?</span>*/}
            <div className="profile__status">
                <p>{props.currentUser.description}</p>
            </div>
            <div className="profile__services services">
                <span className="suggestion">Вас интересует:</span>
                <div className="services__list">
                    <ul>
                        <li className="services__enum">Занятия по подготовке к ЕГЭ по профильной математике</li>
                        <li className="services__enum">Занятия по подготовке к ЕГЭ по физике</li>
                        <li className="services__enum">Консультация по физическим направлениям в Бауманке</li>
                    </ul>
                </div>
                <button className="profile__sending" type="submit">Закрыть набор заявок</button>
            </div>
        </Fragment>
    );
}

export default SchoolProfile