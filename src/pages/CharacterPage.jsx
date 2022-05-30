import React from "react";
import { connect } from "react-redux";

class CharacterPage extends React.Component {
  render() {
    const { newValue } = this.props;
    return (
      <div className="character-page">
        <h1>Hello, World!</h1>
        {console.log(newValue)}
      </div>
    )
  }
}

const mapStateToProps = store => ({
  newValue: store.state
});

export default connect(mapStateToProps)(CharacterPage);
