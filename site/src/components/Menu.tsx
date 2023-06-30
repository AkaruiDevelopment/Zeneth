import MenuIcon from '@mui/icons-material/Menu';
import type { MouseEventHandler } from 'react';
import { useState } from 'react';

const Menu = (props: {
    id: string | undefined; toggleMenu: MouseEventHandler<SVGSVGElement> | undefined; 
}) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
    window.addEventListener('resize', () => {
        setWindowWidth(window.innerWidth);
    });

    return (
        <MenuIcon sx={{
            color: 'white',
            fontSize: '3rem',
            zIndex: 1000,
            cursor: 'pointer',
            display: windowWidth > 770 ? 'none' : 'block'
        }} onClick={props.toggleMenu}
        id={props.id}
         />
    );
}

export default Menu;