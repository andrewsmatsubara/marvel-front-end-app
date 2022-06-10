import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { store } from "../redux/store";
import { getCharacter, getComic } from "../util/util";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";

const CharacterCard = () => {
  const [characters, setCharacters] = useState([]);
  const [description, setDescription] = useState([]);
  const [thumbnail, setThumbnail] = useState([]);

  const reduxStore = store.getState();
  const characterName = reduxStore.reducers.characterState.newCharacterValue;
  const character = characters.find((character) => (character.name === characterName));

  const getCharacters = async () => {
    const result = await getCharacter();

    setCharacters(result);
  }

  const getComicsDescription = async () => {
    if (!character) {
      return <h3>Carregando...</h3>
    }

    const result = await Promise.all(character.comics.items.map(async (item) => await getComic(item.resourceURI).then((d) => d.description)));

    setDescription(result);
  }

  const getComicsThumbnail = async () => {
    if (!character) {
      return <h3>Carregando...</h3>
    }

    const result = await Promise.all(character.comics.items.map(async (item) => await getComic(item.resourceURI).then((d) => d.thumbnail)));

    setThumbnail(result);
  }


  const characterInfo = () => {
    if (!character) {
      return <h3>Não foi possível encontrar este personagem!</h3>
    }

    return <div key={`${character.name}-info`}>
      <section style={{ display: 'flex', flexDirection: 'row', width: '80%', backgroundColor: '#BFCBC2', borderRadius: '10px' }}>
        <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} style={{ display: 'flex', width: '200px', borderRadius: '10px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
          <h3>{`${character.name}`}</h3>
          <p>{`${character.description}`}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <Link to='/home'>
            <Button>
              Voltar
            </Button>
          </Link>
        </div>
      </section>
      <section style={{ display: 'flex', flexDirection: 'column' }}>
        <h2>Fascículos</h2>
        {character.comics.items.map((item, i) => <div key={`${item.name}-${i}`} style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'lightgray', marginBottom: '10px', borderRadius: '10px', width: '80%' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {thumbnail ? <img src={thumbnail[i]} style={{ display: 'flex', width: '100px', borderRadius: '10px' }} /> : <h3>Carregando</h3>}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '10px' }}>
                      <h4>
                        Título
                      </h4>
                      <p style={{ display: 'flex', marginLeft: '10px' }}>
                        {item.name.split('#')[0]}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', marginLeft: '10px' }}>
                      <h4>
                        Número de capa
                      </h4>
                      <p style={{ display: 'flex', marginLeft: '10px' }}>
                        {`#${item.name.split('#')[1]}`}
                      </p>
                    </div>
                  </div>
                </div>
                {description !== [] ? <p style={{ display: 'flex', marginLeft: '10px' }}>{description[i]}</p> : <h3>Carregando</h3>}
              </div>
            </div>
          </div>
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
    getComicsThumbnail();
  }, [character]);

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
