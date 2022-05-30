export const getCharacter = async () => {
  const MARVEL_URL = `https://gateway.marvel.com/v1/public/characters?ts=1653730552107&apikey=ba4d39cdf749c3703f4c8669a6c8a68e&hash=083ebbc99af83e97d8430f4dfac9a0cb`;
  const response = await fetch(MARVEL_URL)
  const result = await response.json();

  return result.data.results;
}
