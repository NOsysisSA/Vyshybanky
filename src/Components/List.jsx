
import React from 'react';

function List({ users }) {
  return (
    <div>
      <h1>List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} <br /> {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List
