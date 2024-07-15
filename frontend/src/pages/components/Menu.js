import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap, faCompass, faUser } from '@fortawesome/free-regular-svg-icons';
import { faMap as solidMap, faCompass as solidCompass, faUser as solidUser } from '@fortawesome/free-solid-svg-icons';
import '../../css/customComponent.css';
import styled from 'styled-components';
import home from '../../images/icons/logo_outlined.png';
import homeFilled from '../../images/icons/logo_filled.png';

const items = [
    {
        name: 'goToHome',
        navigate: '/Home',
        icon: home,
        clicked_icon: homeFilled,
    },
    {
        name: 'goToPlan',
        navigate: '/plan',
        icon: <FontAwesomeIcon className="iconImg" icon={faMap} />,
        clicked_icon: <FontAwesomeIcon className="iconImg" icon={solidMap} />,
    },
    {
        name: 'goToProduct',
        navigate: '/product',
        icon: <FontAwesomeIcon className="iconImg" icon={faCompass} />,
        clicked_icon: <FontAwesomeIcon className="iconImg" icon={solidCompass} />,
    },
    {
        name: 'goToMyPage',
        navigate: '/settings',
        icon: <FontAwesomeIcon className="iconImg" icon={faUser} />,
        clicked_icon: <FontAwesomeIcon className="iconImg" icon={solidUser} />,
    },
];

const Menu = ({ menu, setMenu }) => {
    const [isActiveMenu, setIsActiveMenu] = useState(() => {
        const savedState = localStorage.getItem('activeMenu');
        return savedState !== null ? JSON.parse(savedState) : 0;
    });
    const navigate = useNavigate();
    const location = useLocation();

    const toggleMenu = (index, navigateTo) => {
        setIsActiveMenu(index);
        localStorage.setItem('activeMenu', JSON.stringify(index));
        navigate(navigateTo);
    };

    useEffect(() => {
        const currentPath = location.pathname;
        const activeIndex = items.findIndex(item => item.navigate === currentPath);
        if (activeIndex !== -1) {
            setIsActiveMenu(activeIndex);
        }
    }, [location]);

    return (
        <nav className='menuBar'>
            {items.map((item, idx) => (
                <MenuDiv
                    key={idx}
                    className={`menuBtn ${isActiveMenu === idx ? 'clicked' : ''}`}
                    onClick={() => toggleMenu(idx, item.navigate)}
                >
                    {idx === 0 ? 
                        <img className="iconImg" src={isActiveMenu === idx ? item.clicked_icon : item.icon} alt='메뉴 아이콘' /> :
                        (isActiveMenu === idx ? item.clicked_icon : item.icon)
                    }
                </MenuDiv>
            ))}
        </nav>
    );
};

const MenuDiv = styled.div`
    &.clicked {
        color: #45866B;
        /* background-color: #f0f0f0; Change background color when clicked */
    }
`;

export default Menu;
