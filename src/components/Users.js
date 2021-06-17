import React, { useState } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import profile from '../media/profile.png';

export default function Users({ setIsAuth }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    function LogOut() {
        window.localStorage.removeItem('email');
        setIsAuth(false);
    }
    return (
        <>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle  className='me-3' color='light'>              
                <img src={ profile } className='w-75' alt='profile_img' />
            </DropdownToggle>
            <DropdownMenu
                modifiers={{
                setMaxHeight: {
                    enabled: true,
                    order: 890,
                    fn: (data) => {
                    return {
                        ...data,
                        styles: {
                        ...data.styles,
                        overflow: 'auto',
                        maxHeight: '100px',
                        },
                    };
                    },
                },
                }}
            >
                <DropdownItem onClick={LogOut} className='text-danger fw-bolder'>Log Out</DropdownItem>
        </DropdownMenu>
        </Dropdown>  
        </>
    )
}
