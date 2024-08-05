import React, { useState, useEffect } from 'react';
import AddPokemonUser from './components/AddPokemonUser';
import ListPokemonUsers from './components/ListPokemonUsers';
import axios from 'axios';
import './App.css';

const App = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleAddUser = (newUser) => {
        const existingUserIndex = users.findIndex(user => user.ownerName === newUser.ownerName);
        if (existingUserIndex !== -1) {
            const updatedUsers = users.map((user, index) => index === existingUserIndex ? newUser : user);
            setUsers(updatedUsers);
        } else {
            setUsers([...users, newUser]);
        }
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
    };

    const handleDeleteUser = (ownerName) => {
        axios.delete(`http://localhost:5000/api/users/${ownerName}`)
            .then(() => {
                setUsers(users.filter(user => user.ownerName !== ownerName));
            })
            .catch(error => console.error('Error deleting user:', error));
    };

    const handleFormSubmit = (user) => {
        if (editingUser) {
            axios.put(`http://localhost:5000/api/users/${editingUser.ownerName}`, user)
                .then(response => {
                    const updatedUsers = users.map(u => u.ownerName === editingUser.ownerName ? response.data : u);
                    setUsers(updatedUsers);
                    setEditingUser(null);
                })
                .catch(error => console.error('Error updating user:', error));
        } else {
            axios.post('http://localhost:5000/api/users', user)
                .then(response => {
                    setUsers([...users, response.data]);
                })
                .catch(error => console.error('Error adding user:', error));
        }
    };

    return (
        <div>
            <h1>Pokémon App</h1>
            <AddPokemonUser onAddUser={handleFormSubmit} editingUser={editingUser} />
            <ListPokemonUsers users={users} onDelete={handleDeleteUser} onEdit={handleEditUser} />
        </div>
    );
};

export default App;
