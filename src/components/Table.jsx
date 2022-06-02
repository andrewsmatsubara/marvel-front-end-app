import React, { useEffect, useState } from "react"
import { getCharacter } from '../util/util'

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
          <th>Nome</th>
          <th>Descrição</th>
          <th>Última atualização</th>
        </tr>
        {characters.map((character) => <tr key={`${character.name}-info`}>
          <td key={`${character.name}`}>{character.name}</td>
          <td key={`${character.name}-description`}>{character.description}</td>
          <td key={`${character.name}-last-modification`}>{character.modified}</td>
        </tr>)}
      </tbody>
    </table>
  )
}