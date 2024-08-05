import React from 'react';

const ListPokemonUsers = ({ users, onDelete, onEdit }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Owner Name</th>
                    <th>Pokémon Name</th>
                    <th>Ability</th>
                    <th>Initial Position X</th>
                    <th>Initial Position Y</th>
                    <th>Speed</th>
                    <th>Direction</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr key={index}>
                        <td>{user.ownerName}</td>
                        <td>{user.pokemonName}</td>
                        <td>{user.pokemonAbility}</td>
                        <td>{user.initialPositionX}</td>
                        <td>{user.initialPositionY}</td>
                        <td>{user.speed}</td>
                        <td>{user.direction}</td>
                        <td>
                            <button onClick={() => onEdit(user)}>Edit</button>
                            <button onClick={() => onDelete(user.ownerName)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ListPokemonUsers;
