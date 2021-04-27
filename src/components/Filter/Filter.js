import React from 'react';

import { useDispatch, useSelector } from 'react-redux'; //для подключения к глобальному store.js

// Data
import { contactsActions, contactsSelectors } from '../../redux/phonebook';

export default function Filter() {
  // useSelector
  const value = useSelector(contactsSelectors.getFilter);

  // useDispatch
  const dispatch = useDispatch();
  const onChange = event =>
    dispatch(contactsActions.changeFilter(event.target.value));

  return (
    <label>
      Find contacts by name
      <br />
      <input type="text" value={value} onChange={onChange} />
    </label>
  );
}
