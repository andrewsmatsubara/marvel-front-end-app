import React from "react";
import { connect } from "react-redux";
import CharacterCard from "../components/CharacterCard";

const CharacterPage = () => {
  return (
    <div className="character-page">
      <CharacterCard />
    </div>
  );
}

const mapStateToProps = store => ({
  newValue: store.state
});

export default connect(mapStateToProps)(CharacterPage);
