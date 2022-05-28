import React, { useEffect } from "react";
import getCharacter from "./util/util";

const App = () => {
  useEffect(() => {
    getCharacter();
  }, []);
  return (
    <>
      <h1>Hello, World!</h1>
    </>
  )
}

export default App
