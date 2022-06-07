import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { store } from "../redux/store";
import { getCharacter, getComic } from "../util/util";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";

const CharacterCard = () => {
  const [characters, setCharacters] = useState([]);
  const [description, setDescription] = useState([]);
  // const [thumbnail, setThumbnail] = useState([]);

  const reduxStore = store.getState();
  const characterName = reduxStore.reducers.characterState.newCharacterValue;

  const getCharacters = async () => {
    const result = await getCharacter();

    setCharacters(result);
  }

  const getComicsDescription = async () => {
    const descriptionArray = [];
    const character = characters.find((character) => (character.name === characterName));


    if (!character) {
      return <h3>Carregando...</h3>
    }

    // character.comics.items.map((item) => getComic(item.resourceURI).then((d) => setDescription((desc) => (d.description !== '' || d.description !== null) ? (desc.includes(d.description) ? [desc] : [...desc, d.description]) : [...desc, d.description])));

    character.comics.items.map(async (item) => await getComic(item.resourceURI).then((d) => descriptionArray.push(d.description)));

    if (descriptionArray.length === 0) {
      console.log('Carregando!');
    }

    setDescription(descriptionArray);

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
          {description.map((desc) => <p>{desc}</p>)}
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
    <div className="character-card">
      {characterInfo()}
    </div>
  )
}

const mapStateToProps = store => ({
  newValue: store.state
});

export default connect(mapStateToProps)(CharacterCard);
