import { store } from '../redux/store/index'
import CryptoJS from 'crypto-js';

export const getTimestamp = async () => {
  const data = "01/06/2022";
  const hora = "20:00:00";
  const d = new Date(data + " " + hora);
  const timestamp = d.getTime();

  return timestamp;
}

export const getPublicKey = async () => {
  const state = store.getState();

  return state.reducers.accessState.newPublicValue;
}

export const getPrivateKey = async () => {
  const state = store.getState();

  return state.reducers.accessState.newPrivateValue;
}

export const createHash = async () => {
  const timestamp = await getTimestamp();
  const publicKey = await getPublicKey();
  const privateKey = await getPrivateKey();

  const hash = CryptoJS.MD5(`${timestamp}${privateKey}${publicKey}`).toString();

  return hash;
}

export const getCharacter = async () => {
  const timestamp = await getTimestamp();
  const publicKey = await getPublicKey();
  const hash = await createHash();
  const MARVEL_URL = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
  const response = await fetch(MARVEL_URL);
  const result = await response.json();

  if (result && result.code === 'InvalidCredentials') {
    window.alert('As credenciais estão incorretas!');
  }

  return result.data.results;
}

export const getComicDescription = async (id) => {
  const timestamp = await getTimestamp();
  const publicKey = await getPublicKey();
  const hash = await createHash();
  const RESOURCE_URI = `https://gateway.marvel.com/v1/public/comics/${id}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
  const response = await fetch(RESOURCE_URI);
  const result = await response.json();

  return result.data.results[0].description;
}
