import React from 'react';
import ContactItem from '../ContactItem';

const ContactList = ({ contacts }) => {
  return (
    <ul>
      {contacts.map(({ id, name, number }) => (
        <ContactItem key={id} name={name} number={number} />
      ))}
    </ul>
  );
};

export default ContactList;
