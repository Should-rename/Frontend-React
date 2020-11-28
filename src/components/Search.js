import React, {Fragment, useEffect, useState} from 'react'
import axios from 'axios'

import '../css/search.css'

import ellipse from '../css/images/ellipse.svg'
import {Link} from 'react-router-dom';

const subjects = ['Математика', 'Физика', 'Программирование', 'Биология', 'Химия'];

const subList = subjects.map(sub =>
    <div className='option' key={sub + Math.random()}>
        <input
            id={`${sub}`}
            className="checkbox"
            type="checkbox"
            name="hopping"
            value={`${sub}`}
        />
        <label htmlFor={`${sub}`} className='search__label'>{sub}</label>
    </div>
)

const unis = ['СПБПУ', 'СПБГУ', 'МГУ', 'ЛЭТИ', 'СУРГУ'];

const uniList = unis.map(uni =>
    <div className='option' key={uni + Math.random()}>
        <input
            id={`${uni}`}
            className="checkbox"
            type="checkbox"
            name="hopping"
            value={`${uni}`}
        />
        <label htmlFor={`${uni}`} className='search__label'>{uni}</label>
    </div>
)

const specializations = ['Программная Инженерия', 'Информатика и вычислительная техника', 'Лечебное дело', 'Педиатрия', 'Дизайн'];

const specList = specializations.map(spec =>
    <div className='option' key={spec + Math.random()}>
        <input
            id={`${spec}`}
            className="checkbox"
            type="checkbox"
            name="hopping"
            value={`${spec}`}
        />
        <label htmlFor={`${spec}`} className='search__label'>{spec}</label>
    </div>
)

const linkStyle = {
    textDecoration: 'none'
}

const Search = () => {
    const [users, setUsers] = useState(null);

    const fetchData = async () => {
        const response = await axios.get(
            'http://localhost:8080/users'
        );
        if (users === null) {
            setUsers(response.data);
        }

    };

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            fetchData()
                .then(resp => console.log('--USE EFFECT',resp))
        }
        return () => { isMounted = false };
    })

    return (
        <div className="search__container">
            <div className="search__parameters">
                <div className="search__user-type">
                    <div className="search__title">Кого ищем:</div>
                    <form>
                        <div className="option">
                            <input
                                id="student"
                                className="option-radio"
                                type="radio"
                                name="hopping"
                                value="student"
                            />
                            <label htmlFor="student" className="option-label">Студента</label>
                        </div>
                        <div className="option">
                            <input
                                id="pupil"
                                className="option-radio"
                                type="radio"
                                name="hopping"
                                value="pupil"
                            />
                            <label htmlFor="pupil" className="option-label">Ученика</label>
                        </div>
                    </form>
                </div>
                <div className="search__subjects">
                    <div className="search__title">Предметы:</div>
                    <form className="form">
                        <div className="option">
                            <input
                                id="all-subjects"
                                className="checkbox"
                                type="checkbox"
                                name="hopping"
                                value="all-subjects"
                            />
                            <label htmlFor="all-subjects" className='search__label'>Все</label>
                        </div>
                        {subList}
                    </form>
                </div>
                <div className="search__university">
                    <div className="search__title">ВУЗы:</div>
                    <form className="form">
                        <div className="option">
                            <input
                                id="all-unis"
                                className="checkbox"
                                type="checkbox"
                                name="hopping"
                                value="all-unis"
                            />
                            <label htmlFor="all-unis" className='search__label'>Все</label>
                        </div>
                        {uniList}
                    </form>
                </div>
                <div className="search__specialization">
                    <div className="search__title">Направления:</div>
                    <form className="form">
                        <div className="option">
                            <input
                                id="all-specs"
                                className="checkbox"
                                type="checkbox"
                                name="hopping"
                                value="all-specs"
                            />
                            <label htmlFor="all-specs" className='search__label'>Все</label>
                        </div>
                        {specList}
                    </form>
                </div>
            </div>
            <div className="vertical-separator"></div>
            <div className="search__results">
                {users &&
                users.map(user => {
                    return (
                            <Link to={{
                                pathname: '/searchProfile',
                                propsSearch: user
                            }} key={user.id} style={linkStyle}>
                                <div className="search__profile__container" id={user.id}>
                                    <div className="search__profile-text-info">
                                        <div className="profile-name-uni-spec">
                                            <div className="profile__name">{user.second_name} {user.first_name}</div>
                                            <div className="profile__uni">{user.uni ? user.uni.name : ''}</div>
                                            <div className="profile__spec">{user.specialization ? user.specialization.name : ''}</div>
                                        </div>
                                        <div className="profile-description">
                                            {user.description ? user.description : ''}
                                        </div>
                                    </div>
                                    <div className="search__profile-avatar"><img src={ellipse} className="avatar-ellipse" alt='avatar'/></div>
                                </div>
                            </Link>
                    );
                })}

            </div>
        </div>
    );
}

export default Search