import React from "react";
import { Route, Routes } from "react-router";
import CharacterPage from "./pages/CharacterPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/character" element={<CharacterPage />} />
        </Routes>
      </div>
    )
  }
}

export default App;
