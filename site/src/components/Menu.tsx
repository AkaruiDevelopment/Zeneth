import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';


const Menu = (props: {
    id: string | undefined;
}) => {

    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
    
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
        }} 
        id={props.id}
         />
    );
}

export default Menu;