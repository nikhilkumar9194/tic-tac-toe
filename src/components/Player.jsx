import { useState } from 'react';

export default function Player({ name, symbol, isActive, onNameChanged }) {
    const [playerName, setPlayerName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);

    function handleEdit() {
        setIsEditing(isEditing => !isEditing);
        if (isEditing) {
            onNameChanged(symbol, playerName);
        }
    }

    function handleNameChange(e) {
        setPlayerName(e.target.value);
    }

    return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {isEditing ? (<input type="text" value={playerName} onChange={handleNameChange} />) : (<span className="player-name">{playerName}</span>)}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  )
}