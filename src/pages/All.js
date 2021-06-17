import React, { useState } from 'react';
import { 
    Container, 
    Row, Col, 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter } from 'reactstrap';

const ContactList = ({ contactsData, searchText }) => {
    const [ contacts, setContacts ] = useState(contactsData);
    const [modal, setModal] = useState(false);
    const [IsEdit, setIsEdit] = useState(false);
    const [EditId, setEditId] = useState(null);
    const [ConObj, setConObj] = useState({});
    const toggle = () => setModal(!modal);
    const fullNameRef = React.useRef();
    const emailRef = React.useRef();
    const phoneRef = React.useRef();
    const companyRef = React.useRef();
    const isFamRef = React.useRef();
    const isFrRef = React.useRef();
    const isFavRef = React.useRef();

    console.log(searchText);

    const SaveContact = () => {
        let contactsArr = [];
        contacts.map((contact) => {
            contactsArr.push(contact);
            return true
        });
        let contact = {
            full_name: fullNameRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value,
            company: companyRef.current.value,
            isFam: isFamRef.current.checked,
            isFr: isFrRef.current.checked,
            isFav: isFavRef.current.checked,
        };
        contactsArr.push(contact); 
        setContacts(contactsArr);
        toggle();
    }

    const DeleteContact = (id) => {
        let contactsArr = [];
        contacts.map((contact, index) => {
            id !== index ? contactsArr.push(contact): console.log();
            return true;
        });

        setContacts(contactsArr);
        delete contactsData[id]
    };

    const BookMark = (id) => {
        let contactsArr = [];
        contacts.map((contact)=> {
            contactsArr.push(contact);
            return true;
        });

        contactsArr.map((contact, index)=> {
            id === index ? contact.isFav = !contact.isFav : console.log();
            return true;
        });

        setContacts(contactsArr);
    }

    const EditContact = (obj, id) => {
        setIsEdit(true);
        setConObj(obj);
        setEditId(id);
        setTimeout(function() {
            fullNameRef.current.value = obj.full_name
            emailRef.current.value = obj.email
            phoneRef.current.value = obj.phone
            companyRef.current.value = obj.company
            isFamRef.current.checked = obj.isFam
            isFrRef.current.checked = obj.isFr
            isFavRef.current.checked = obj.isFav
        }, 50)

        toggle()
    }

    const ObjectAdd = () => {
        let ArrCon = []
        contacts.map(contact => {
            ArrCon.push(contact)
            return true;
        })

        ArrCon[EditId] = {
            full_name: fullNameRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value,
            company: companyRef.current.value,
            isFam: isFamRef.current.checked,
            isFr: isFrRef.current.checked,
            isFav: isFavRef.current.checked,
        }
        setConObj(ArrCon);
        setContacts(ArrCon);
        contactsData = ArrCon;
        
        toggle()
    }

    return(
        <> 
            <div className='content'>
                <div className='d-flex justify-content-between align-items-center'> 
                    <span className='fs-2 m-4 fw-bold text-secondary'>All Contacts</span>
                    <button className='btn-lg btn me-4 add_button shadow' onClick={toggle}><i className='fas fa-plus'></i> Add New</button>
                </div>
                <Container>
                <div>
                        <Modal isOpen={modal} toggle={toggle}>
                            <ModalHeader toggle={toggle}>Add new contact</ModalHeader>
                            <ModalBody>
                                <>
                                    <Container fluid>
                                        <Row>
                                            <Col sm='12'>
                                                <div>
                                                    <label htmlFor='full_name'></label><br />
                                                    <input id='full_name' ref={ fullNameRef } type='text' className='p-1 bgLight inp_add_contact fs-5 w-100' placeholder='Enter name...' />
                                                </div>
                                            </Col>
                                            <Col sm='12'>
                                                <div>
                                                    <label htmlFor='email'></label><br />
                                                    <input id='email' ref={ emailRef } type='email' className='p-1 bgLight inp_add_contact fs-5 w-100' placeholder='Enter email...' />
                                                </div>
                                            </Col>
                                            <Col sm='6'>
                                                <div>
                                                    <label htmlFor='phone'></label><br />
                                                    <input id='phone' ref={ phoneRef } type='text' className='p-1 bgLight inp_add_contact fs-5 w-100' placeholder='Enter phone number...' />
                                                </div>
                                            </Col>
                                            <Col sm='6'>
                                                <div>
                                                    <label htmlFor='company'></label><br />
                                                    <input id='company' ref={ companyRef } type='text' className='p-1 bgLight inp_add_contact fs-5 w-100' placeholder='Enter company name...' />
                                                </div>
                                            </Col>
                                            <Col sm='12' className='d-flex justify-content-around mt-4'>
                                                <div>
                                                    <input id='isFam' ref={ isFamRef } type='checkbox' /> 
                                                    <span className='ms-2'>Family</span>
                                                </div>
                                                <div>
                                                    <input id='isFam' ref={ isFrRef } type='checkbox' /> 
                                                    <span className='ms-2'>Friend</span>
                                                </div>
                                                <div>
                                                    <input id='isFam' ref={ isFavRef } type='checkbox' /> 
                                                    <span className='ms-2'>Favourite</span>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </>
                            </ModalBody>
                            <ModalFooter>
                                {
                                    IsEdit ? 
                                    <>
                                        <Button color='info' onClick={ObjectAdd}>Add</Button>
                                        <Button color='danger'>X</Button>
                                    </> : 
                                    <Button className='add_button' onClick={SaveContact}>Save</Button>
                                }                               
                            </ModalFooter>
                        </Modal>
                    </div>
                    <Row>
                        <Col className='p-0'>
                            <table className='table'>
                                <thead>
                                    <tr className='td_contact_user'>
                                        <th className='ps-3'>Name</th>
                                        <th>Email</th>
                                        <th>Number</th>
                                        <th>Company</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        contacts.map((contact, index) => {
                                            if(contact.full_name.toLowerCase().indexOf(searchText.toLowerCase()) === -1){
                                                return;
                                            }
                                            return(
                                                <tr className='td_contact_user' key={ index }>
                                                    <td className='p-3 fs-5'>{ contact.full_name }</td>
                                                    <td className='p-3 fs-5'>{ contact.email }</td>
                                                    <td className='p-3 fs-5'>{ contact.phone }</td>
                                                    <td className='p-3 fs-5'>{ contact.company }</td>
                                                    <td className='p-3 fs-5'>
                                                        {
                                                            contact.isFav ? 
                                                            <i onClick={()=> BookMark(index)} className='fas fa-bookmark text-info me-3'></i> :
                                                            <i onClick={()=> BookMark(index)} className='fas fa-bookmark text-muted me-3'></i>

                                                        }
                                                        <i onClick={()=> EditContact(contact, index)} className='fas fa-edit text-secondary me-3'></i>
                                                        <i onClick={()=> DeleteContact(index)} className='fas fa-trash text_for_delete'></i></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default ContactList;
