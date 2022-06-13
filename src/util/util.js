// import { store } from '../redux/store/index'
import CryptoJS from 'crypto-js';

export const getTimestamp = async () => {
  const data = "01/06/2022";
  const hora = "20:00:00";
  const d = new Date(data + " " + hora);
  const timestamp = d.getTime();

  return timestamp;
}

export const getPublicKey = async () => {
  const publicKey = localStorage.getItem('publicKey');

  return publicKey;
}

export const getPrivateKey = async () => {
  const privateKey = localStorage.getItem('privateKey');

  return privateKey;
}

export const createHash = async () => {
  const timestamp = await getTimestamp();
  const publicKey = await getPublicKey();
  const privateKey = await getPrivateKey();

  const hash = CryptoJS.MD5(`${timestamp}${privateKey}${publicKey}`).toString();

  return hash;
}

export const getCharacter = async () => {
  try {
    const timestamp = await getTimestamp();
    const publicKey = await getPublicKey();
    const hash = await createHash();
    const MARVEL_URL = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
    const response = await fetch(MARVEL_URL);

    if (response.ok === false) {
      return false;
    }

    const result = await response.json();

    return result.data.results;
  } catch (e) {
    return e.message;
  }
}

export const getComic = async (url) => {
  const timestamp = await getTimestamp();
  const publicKey = await getPublicKey();
  const hash = await createHash();
  const RESOURCE_URI = `${url}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
  const response = await fetch(RESOURCE_URI);
  const result = await response.json();

  return { thumbnail: `${(result.data.results[0].thumbnail.path)}.${result.data.results[0].thumbnail.extension}`, description: result.data.results[0].description };
}
