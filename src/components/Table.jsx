import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCharacter } from '../util/util';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { characterAction } from "../redux/actions";
// import '../css/table.css'

const Table = ({ characterAction }) => {
  const [characters, setCharacters] = useState([]);

  const getCharacters = async () => {
    const result = await getCharacter();

    setCharacters(result);
  }

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <table className="character-table">
      <tbody>
        <tr>
          <th style={{ border: '1px solid black' }} >Nome</th>
          <th style={{ border: '1px solid black' }}>Descrição</th>
          <th style={{ border: '1px solid black' }}>Última atualização</th>
        </tr>
        {characters.map((character) => <tr key={`${character.name}-info`}>

          <td key={`${character.name}`} style={{ border: '1px solid black' }}>
            <Link to='/character' onClick={() => characterAction(character.name)}>
              {character.name}
            </Link>
          </td>
          <td key={`${character.name}-description`} style={{ border: '1px solid black' }}>{character.description}</td>
          <td key={`${character.name}-last-modification`} style={{ border: '1px solid black' }}>{character.modified}</td>
        </tr>)}
      </tbody>
    </table>
  )
}

const mapStateToProps = store => ({
  newValue: store.state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ characterAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Table);
