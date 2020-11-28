import React from 'react'

import '../css/navigation.css'

import search from '@/css/images/search.svg'
import schedule_fix from '@/css/images/schedule_fix.svg'
import messages from '@/css/images/messages.svg'
import profile from '@/css/images/profile.svg';
import {Link} from 'react-router-dom';

const Navigation = () => {
    return (
        <div className='navigation'>
            <div className='icon'>
                <Link to='/profile' >
                    <img src={profile} alt='profile'/>
                </Link>
            </div>
            <div className='icon'>
                <Link to='/search'>
                    <img src={search} alt='search'/>
                </Link>
            </div>
            <div className='icon'>
                <Link to='/requests'>
                    <img src={schedule_fix} alt='schedule_fix'/>
                </Link>
            </div>
            <div className='icon'>
                <Link to='/messages'>
                    <img src={messages} alt='messages'/>
                </Link>
            </div>
        </div>
    );
}

export default Navigation