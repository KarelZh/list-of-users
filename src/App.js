import React, { useEffect, useState } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [success, setSuccess] = useState(false);

  let a = 2;
  let b = 3; 
  function name(a, b) {
    return a + b;
  }
  console.log(name(2, 3))
  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then(res => res.json())
      .then(json =>{
        setUsers(json.data);
      }).catch(err => {
        console.error(err);
        alert('Ошибка при получении пользователей');
      }).finally(() => setLoading(false));
  }, []);

  const onChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  }

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites(prev => prev.filter(_id => _id !== id));
    } else {
      setInvites((prev) => [ ... prev, id]);
    }
  };

  const onClickSendInvites = () => {
    setSuccess(true)
  }

  return (
    <div className="App">
      {
        success ? (
          <Success count={invites.length}/>
        ):(
          <Users 
            onChangeSearchValue={onChangeSearchValue}
            searchValue={searchValue} 
            items={users} 
            isLoading={isLoading}
            invites={invites}
            onClickInvite={onClickInvite}
            onClickSendInvites={onClickSendInvites}
          />
        )
      }
    </div>
  );
}

export default App;
