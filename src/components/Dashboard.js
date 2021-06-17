import { Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import phone from '../media/phone.png';
import { NavLink } from 'react-router-dom'
import Users from "./Users";
import React,  { useState, useRef } from "react";


function Dash({ contactsData, setSearchText, setIsAuth }) {    
    const [ contacts, setContacts ] = useState(contactsData)
    // const [SearchContact, setSearchContact] = useState('')
    const SearchRef = useRef()

    const SearchBar = () => {
        setSearchText(SearchRef.current.value);
    }

    return(
        <>
            <Row className='miniShadow position-relative m-0 p-0 bg-white' style={{ zIndex: '2' }}>
                <Col className='p-2 text-center' sm='2' md='1'>
                    <img src={ phone } className='w-50' alt='phone_img' />
                </Col>
                <Col className='d-flex align-items-center' sm='8' md={{ size: 6, offset: 2 }}>
                    <input ref={SearchRef} type='search' placeholder='Search' className='border-0 rounded p-3 w-100 bgLight' onChange={SearchBar} />
                </Col>
                <Col className='p-2 text-center' sm='2' md={{ size: 1, offset: 2 }}>
                    <Users setIsAuth={setIsAuth} />
                </Col>
            </Row>
            <div className='sidebar miniShadow'>
                <ListGroup>
                    <NavLink style={{textDecoration: 'none'}} to='/'><ListGroupItem className='p-3'><i className='fa fa-user-circle me-3 text-secondary fs-4'></i> All Contacts</ListGroupItem></NavLink>
                    <NavLink style={{textDecoration: 'none'}} to='/family'><ListGroupItem className='p-3'><i className='fa fa-house-user me-3 text-secondary fs-4'></i> My Family</ListGroupItem></NavLink>
                    <NavLink style={{textDecoration: 'none'}} to='/friends'><ListGroupItem className='p-3'><i className='fa fa-user-friends me-3 text-secondary fs-4'></i> My Friends</ListGroupItem></NavLink>
                    <NavLink style={{textDecoration: 'none'}} to='/favourites'><ListGroupItem className='p-3'><i className='fa fa-bookmark me-3 text-secondary fs-4'></i> Favourites</ListGroupItem></NavLink>
                </ListGroup>
            </div>
        </>
    )
}

export default Dash;