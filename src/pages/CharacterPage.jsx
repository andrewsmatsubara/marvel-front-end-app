import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { store } from "../redux/store";
import { getCharacter, getComic } from "../util/util";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";

const CharacterPage = () => {
  const [characters, setCharacters] = useState([]);
  const [description, setDescription] = useState([]);
  const [thumbnail, setThumbnail] = useState([]);

  const reduxStore = store.getState();
  const characterName = reduxStore.reducers.characterState.newCharacterValue;

  // const getDescription = () => {
  //   // pegar as resourceURI do personagem, fazer map para URI, retirar os ids, chamar os ids na função getComicDescription

  //   const character = characters.find((character) => (character.name === characterName));

  //   const result = character.comics.items.map((url) => console.log(getComicDescription(((url.resourceURI).substring((url.resourceURI).lastIndexOf('/') + 1)))));

  //   setDescription(result);

  //   return description;
  // }

  const getCharacters = async () => {
    const result = await getCharacter();

    setCharacters(result);
  }

  const getComicsDescription = () => {
    const character = characters.find((character) => (character.name === characterName));


    if (!character) {
      return <h3>Carregando...</h3>
    }

    character.comics.items.map((item) => getComic(item.resourceURI).then((d) => setDescription(([d.description]))));

    console.log(description);
  }

  // const getComicsThumbnail = () => {
  //   const result = characters.map((character) => getComic(character.comics.items.resourceURI).then((comic) => comic.thumbnail));

  //   setThumbnail(result);
  // }


  const characterInfo = () => {
    const character = characters.find((character) => (character.name === characterName));

    if (!character) {
      return <h3>Não foi possível encontrar este personagem!</h3>
    }

    return <div>
      <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} style={{ width: '200px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
          <h4>{`${character.name}`}</h4>
          <p>{`${character.description}`}</p>
        </div>
        <Link to='/home'>
          <Button>
            Voltar
          </Button>
        </Link>
      </section>
      <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <h2>Fascículos</h2>
        {character.comics.items.map((item) => <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {/* {thumbnail.map((thumb) => console.log(thumb))} */}
            <h4>
              Título
            </h4>
            <p>
              {item.name}
            </p>
          </div>
          <h4>
            Descrição
          </h4>
          {/* {description !== [] ? console.log(description) : <h3>Carregando...</h3>} */}
        </div>
        )}
      </section>
    </div>;
  }

  useEffect(() => {
    getCharacters();
  }, []);

  useEffect(() => {
    getComicsDescription();
    // getComicsThumbnail();
  }, [characters]);

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
