import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../ContactForm';
import Filter from '../Filter';
import ContactList from '../ContactList';
import Notification from '../Notification';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  findContactByName = name => {
    const { contacts } = this.state;
    return contacts.find(item => item.name.toLowerCase() === name);
  };

  formSubmitHandler = data => {
    const { name, number } = data;
    const normalizedName = name.toLowerCase();
    if (this.findContactByName(normalizedName)) {
      alert(`${name} is already in contacts`);
      return;
    }
    this.addContact(name, number);
  };

  addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.getVisibleContacts();
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={this.changeFilter} />
        <>
          {contacts.length > 0 ? (
            <ContactList
              contacts={filteredContacts}
              onDeleteContact={this.deleteContact}
            />
          ) : (
            <Notification message="There is no contact in Phonebook" />
          )}
        </>
      </div>
    );
  }
}
