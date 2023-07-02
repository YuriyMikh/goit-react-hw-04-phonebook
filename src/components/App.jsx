import { useState, useEffect } from 'react';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { AppContainer } from './App.styled';
import { save, load } from '../utils/local-storage';

const LOCALSTORAGE_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  //при первой загрузке проверяем localStorage, если что-то уже есть - записываем в contacts
  useEffect(() => {
    const data = load(LOCALSTORAGE_KEY) ?? [];
    setContacts(data);
  }, []);

  //при перезаписи contacts записываем это в localStorage
  useEffect(() => {
    save(LOCALSTORAGE_KEY, contacts);
  }, [contacts]);

  //функция принимает два параметра из компонента ContactForm
  const onSubmit = (name, number) => {
    //создаёт новый контакт
    const newContact = {
      id: crypto.randomUUID(),
      name, //короткая форма записи
      number, //короткая форма записи
    };

    //если contacts уже содержит контакт с таким именем - выводим alert
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    //если не содержит - записываем в contacts
    setContacts(prev => [...prev, newContact]);
  };

  //записываем то, что пользователь вводит в инпут поиска
  const handleChangeFilter = event => {
    setFilter(event.target.value);
  };

  //в компонент ContactList передаём пользователей для отрисовки (после фильтрации)
  const getFilteredData = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  };

  //удаляем контакт по id
  const handleDelete = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  return (
    <AppContainer>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onSubmit} />

      <h2>Contacts</h2>
      <Filter filterValue={filter} filterChange={handleChangeFilter} />
      <ContactList contacts={getFilteredData()} deleteContact={handleDelete} />
    </AppContainer>
  );
};
