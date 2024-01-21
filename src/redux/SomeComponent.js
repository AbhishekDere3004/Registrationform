// SomeComponent.js

import React from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from './userSlice';

const SomeComponent = () => {
  const dispatch = useDispatch();

  // Example data to be added to submittedUsers
  const userData = {
    name: 'John Doe',
    age: 25,
    // ... other user data
  };

  const handleAddUser = () => {
    // Dispatch the addUser action with the userData payload
    dispatch(addUser(userData));
  };

  return (
    <div>
      {/* Your component UI */}
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
};

export default SomeComponent;
