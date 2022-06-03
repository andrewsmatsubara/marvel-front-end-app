import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { store } from "../redux/store";
import { getCharacter, getComicDescription } from "../util/util";
import { Link } from "react-router-dom";

const CharacterPage = () => {
  const [characters, setCharacters] = useState([]);
  const [description, setDescription] = useState('');

  const reduxStore = store.getState();
  const characterName = reduxStore.reducers.characterState.newCharacterValue;

  // const getDescription = async () => {
  //   // pegar as resourceURI do personagem, fazer map para URI, retirar os ids, chamar os ids na função getComicDescription

  //   const character = await characters.find((character) => (character.name === characterName));

  //   const result = await character.comics.items.map((url) => console.log(getComicDescription(((url.resourceURI).substring((url.resourceURI).lastIndexOf('/') + 1)))));

  //   setDescription(result);

  //   return description;
  // }

  const getCharacters = async () => {
    const result = await getCharacter();

    setCharacters(result);

    return characters;
  }


  const characterInfo = async () => {
    const character = await characters.find((character) => (character.name === characterName));

    if (!character) {
      return <h3>Não foi possível encontrar este personagem!</h3>
    }

    const result = await character.comics.items.map((url) => getComicDescription(((url.resourceURI).substring((url.resourceURI).lastIndexOf('/') + 1))));

    setDescription(result);

    return <div>
      <section>
        <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} />
        <h4>{`${character.name}`}</h4>
        <p>{`${character.description}`}</p>
        <Link to='/home'>
          <button>
            Voltar
          </button>
        </Link>
      </section>
      <section>
        <h2>Fascículo</h2>
        {character.comics.items.map((item) => <div>
          <h4>
            Título
          </h4>
          <p>
            {item.name}
          </p>
          <h4>
            Descrição
          </h4>
          <p>
            {description}
          </p>
        </div>
        )}
      </section>
    </div>;
  }

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <div className="character-page">
      {characterInfo()}
    </div>
  )
}

const mapStateToProps = store => ({
  newValue: store.state
});

export default connect(mapStateToProps)(CharacterPage);
