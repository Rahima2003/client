import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddPokemonUser = ({ onAddUser, editingUser }) => {
    const [pokemon, setPokemon] = useState([]);
    const [abilities, setAbilities] = useState([]);
    const [formData, setFormData] = useState({
        ownerName: '',
        pokemonName: '',
        pokemonAbility: '',
        initialPositionX: 0,
        initialPositionY: 0,
        speed: 0,
        direction: ''
    });

    useEffect(() => {
        if (editingUser) {
            setFormData(editingUser);
        } else {
            setFormData({
                ownerName: '',
                pokemonName: '',
                pokemonAbility: '',
                initialPositionX: 0,
                initialPositionY: 0,
                speed: 0,
                direction: ''
            });
        }
    }, [editingUser]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/pokemon')
            .then(response => setPokemon(response.data))
            .catch(error => console.error('Error fetching Pokémon:', error));
    }, []);

    const handlePokemonChange = (e) => {
        const name = e.target.value;
        setFormData({ ...formData, pokemonName: name });
        axios.get(`http://localhost:5000/api/pokemon/${name}/abilities`)
            .then(response => {
                const abilitiesList = response.data.abilities.map(ability => ability.ability.name);
                setAbilities(abilitiesList);
            })
            .catch(error => console.error('Error fetching abilities:', error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddUser(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Owner Name"
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
            />
            <select onChange={handlePokemonChange} value={formData.pokemonName}>
                <option value="">Select Pokémon</option>
                {pokemon.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
            </select>
            <select
                onChange={(e) => setFormData({ ...formData, pokemonAbility: e.target.value })}
                value={formData.pokemonAbility}
            >
                <option value="">Select Ability</option>
                {abilities.map(ability => <option key={ability} value={ability}>{ability}</option>)}
            </select>
            <input
                type="number"
                placeholder="Initial Position X"
                value={formData.initialPositionX}
                onChange={(e) => setFormData({ ...formData, initialPositionX: parseInt(e.target.value) })}
            />
            <input
                type="number"
                placeholder="Initial Position Y"
                value={formData.initialPositionY}
                onChange={(e) => setFormData({ ...formData, initialPositionY: parseInt(e.target.value) })}
            />
            <input
                type="number"
                placeholder="Speed"
                value={formData.speed}
                onChange={(e) => setFormData({ ...formData, speed: parseInt(e.target.value) })}
            />
            <input
                type="text"
                placeholder="Direction"
                value={formData.direction}
                onChange={(e) => setFormData({ ...formData, direction: e.target.value })}
            />
            <button type="submit">{editingUser ? 'Update Pokémon' : 'Add Pokémon'}</button>
        </form>
    );
};

export default AddPokemonUser;
