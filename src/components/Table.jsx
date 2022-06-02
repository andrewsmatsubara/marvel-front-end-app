import React, { useEffect, useState } from "react";
import { getCharacter } from '../util/util';

export const Table = () => {
  const [characters, setCharacters] = useState([]);

  const getCharacters = async () => {
    const result = await getCharacter();

    setCharacters(result);

    return characters;
  }

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <table>
      <tbody>
        <tr>
          <th style={{ border: '1px solid black' }} >Nome</th>
          <th style={{ border: '1px solid black' }}>Descrição</th>
          <th style={{ border: '1px solid black' }}>Última atualização</th>
        </tr>
        {characters.map((character) => <tr key={`${character.name}-info`}>
          <td key={`${character.name}`} style={{ border: '1px solid black' }}>{character.name}</td>
          <td key={`${character.name}-description`} style={{ border: '1px solid black' }}>{character.description}</td>
          <td key={`${character.name}-last-modification`} style={{ border: '1px solid black' }}>{character.modified}</td>
        </tr>)}
      </tbody>
    </table>
  )
}