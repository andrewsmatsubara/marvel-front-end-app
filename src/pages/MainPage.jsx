import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCharacter } from '../util/util'

class MainPage extends React.Component {
  componentDidMount() {
    getCharacter();
  }
  render() {
    return (
      <div className="main-page">
        <h1>Main Page</h1>
        <Link to='/'>
          <button>
            Voltar
          </button>
        </Link>
      </div>
    )
  }
}

// const mapStateToProps = store => ({
//   newValue: store.state
// });

export default MainPage;
