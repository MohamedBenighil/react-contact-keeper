import React, {useReducer} from 'react'
import {v4} from 'uuid'
import ContactContext from './contactContext'
import ContactReducer from './contactReducer'
import {
 ADD_CONTACT,
 DELETE_CONTACT,
 SET_CURRENT,
 CLEAR_CURRENT,
 UPDATE_CONTACT,
 FILTER_CONTACTS,
 CLEAR_FILTER
 //SET_ALERT,
 //REMOVE_ALERT
} from '../types'

const ContactState = props => {
    const initialSate = {
        contacts: [
            { 
                id: 1,
                name: 'Jill Johnson',
                email: 'jill@gmail.com',
                phone: '111-111-1111',
                type: 'personal'
            },
            {
                id: 2,
                name: 'Sara Watson',
                email: 'jill@gmail.com',
                phone: '222-222-2222',
                type: 'personal'
            },
            {
                id: 3,
                name: 'Harry White',
                email: 'harry@gmail.com',
                phone: '333-333-3333',
                type: 'professional'
            }],

            current: null,
            filtered: null 
    }

    const [state, dispatch] =  useReducer(ContactReducer, initialSate)

    //Add Contact
    const addContact = contact => {
        contact.id = v4()
        dispatch({
            type: ADD_CONTACT,
            payload: contact 
        })
    }
    
    //Delete Contact
    const deleteItem = id =>  {
        dispatch({
            type: DELETE_CONTACT,
            payload: id 
        })
    }

    //Set Current Contact
    const setCurrent = contact => {
        dispatch({
            type: SET_CURRENT,
            payload: contact
        })
    }
    
    //Clear Current Contact 
    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT
        })
    }
    
    //Update Contact 
    const updateContact = (contact) => {
        dispatch({
            type: UPDATE_CONTACT,
            payload: contact
        })
    }

    //Filter Contacts 
    const filterContacts = text => {
        dispatch({
            type: FILTER_CONTACTS,
            payload: text
        })
    }

    //Clear Filter
    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER
        })
    }



    return (
        <ContactContext.Provider
        value={{
            contacts : state.contacts,
            addContact,
            current: state.current,
            filtered: state.filtered,
            deleteItem,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter
        }}
        >
        {props.children}
        </ContactContext.Provider>
    )

}

export default ContactState