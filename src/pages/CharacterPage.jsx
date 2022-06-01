import React from "react";
import { connect } from "react-redux";

class CharacterPage extends React.Component {
  render() {
    // const { newValue } = this.props;
    return (
      <div className="character-page">
        <h1>Character Page</h1>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  newValue: store.state
});

export default connect(mapStateToProps)(CharacterPage);
