import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCharacter } from '../util/util';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { characterAction } from "../redux/actions";

const Table = ({ characterAction }) => {
  const [characters, setCharacters] = useState([]);
  const [indexOffset, setIndexOffset] = useState([]);

  const getCharacters = async (offset) => {
    const result = await getCharacter(offset);

    if (!result) {
      setCharacters('');
    }

    setCharacters(result);
  }

  const getIndex = () => {
    const indexArray = [];
    let o = 0;

    for (let i = 1; i <= 157; i += 1) {
      indexArray.push({ index: i, offset: o });

      o += 10;
    }

    setIndexOffset(indexArray);
  }

  const setCharacterLocalStorage = (character) => {
    localStorage.setItem('character-name', character.name);

    characterAction(character.name)
  }

  const numberClickHandler = () => {
    document.addEventListener('click', (event) => {
      if (event.target.className === 'number-list') {
        localStorage.setItem('id', event.target.textContent);

        const id = indexOffset.find((i) => localStorage.getItem('id') == i.index);

        localStorage.setItem('offset', id.offset);

        getCharacters(id.offset);
      }
    });
  }

  useEffect(() => {
    getCharacters();
    getIndex();
  }, []);

  return (
    !characters ? <h3 style={{ display: 'flex', justifyContent: 'center' }}>Acesso inválido</h3> :
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <table className="character-table">
          <tbody>
            <tr>
              <th style={{ border: '1px solid black' }} >Nome</th>
              <th style={{ border: '1px solid black' }}>Descrição</th>
              <th style={{ border: '1px solid black' }}>Última atualização</th>
            </tr>
            {characters.map((character) => <tr key={`${character.name}-info`}>

              <td key={`${character.name}`} style={{ border: '1px solid black' }}>
                <Link to='/character' onClick={() => setCharacterLocalStorage(character)}>
                  {character.name}
                </Link>
              </td>
              <td key={`${character.name}-description`} style={{ border: '1px solid black' }}>{character.description}</td>
              <td key={`${character.name}-last-modification`} style={{ border: '1px solid black' }}>{character.modified}</td>
            </tr>)}
          </tbody>
        </table>
        <ul style={{ display: 'flex', flexDirection: 'row', width: '60%', flexWrap: 'wrap', justifyContent: 'space-around', margin: '0px', padding: '0px' }}>
          {!indexOffset ? <h3>Carregando</h3> : indexOffset.map((i) => <Link to="/home" key={`${i.index}-link`} onClick={() => numberClickHandler()}>
            <li style={{ display: 'flex', listStyleType: 'none', margin: '10px' }} className='number-list' key={`id-${i.index}`}>{i.index}</li>
          </Link>)}
        </ul>
      </div>
  )
}

const mapStateToProps = store => ({
  newValue: store.state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ characterAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Table);
