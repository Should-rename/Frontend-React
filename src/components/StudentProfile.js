import React, {Fragment} from 'react'

import '../css/studentProfile.css'

const StudentProfile = (props) => {
    const university = props.currentUser.uni ? props.currentUser.uni.name : 'Университет';
    const specialization = props.currentUser.specialization ? props.currentUser.specialization.name : 'Специализация';
    const description = props.currentUser.description ? props.currentUser.description : '';

    const priceTable = props.currentUser.services.map((service) =>
        <tr key={service.name+service.price+Math.random()}>
            <td className='services__row'>{service.name}</td>
            <td className='services__price'>{service.price}</td>
        </tr>
    )

    return (
        <Fragment>
            <span className="profile__university post">{university}, {specialization}</span>
            <div className="profile__status">
                <p>{description}</p>
            </div>
            <div className="services">
                <hr className="services__line-upper"/>
                <div className="profile__services">
                    <table className="services__list">
                        <tbody>
                        {priceTable}
                        </tbody>
                    </table>
                </div>
                <hr className="services__line-lower"/>
            </div>
            <button className="profile__sending" type="submit">Закрыть набор заявок</button>
        </Fragment>
    );
}

export default StudentProfile