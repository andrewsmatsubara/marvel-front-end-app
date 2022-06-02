import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { store } from "../redux/store";
import { getCharacter } from "../util/util";
import { Link } from "react-router-dom";

const CharacterPage = () => {
  const [characters, setCharacters] = useState([]);

  const getCharacters = async () => {
    const result = await getCharacter();

    setCharacters(result);

    return characters;
  }

  const reduxStore = store.getState();
  const characterName = reduxStore.reducers.characterState.newCharacterValue;

  const verifyCharacter = () => {
    const character = characters.find((character) => (character.name === characterName));

    if (!character) {
      return <h3>Não foi possível encontrar este personagem!</h3>
    }

    return <section>
      <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} />
      <h4>{`${character.name}`}</h4>
      <p>{`${character.description}`}</p>
    </section>;
  }

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <div className="character-page">
      {verifyCharacter()}
      <Link to='/home'>
        <button>
          Voltar
        </button>
      </Link>
    </div>
  )
}

const mapStateToProps = store => ({
  newValue: store.state
});

export default connect(mapStateToProps)(CharacterPage);
