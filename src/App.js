import React from "react";
import { connect } from "react-redux";

class App extends React.Component {
  render() {
    const { newValue } = this.props;
    return (
      <div className="app">
        <h1>Hello, World!</h1>
        {console.log(newValue)}
      </div>
    )
  }
}

const mapStateToProps = store => ({
  newValue: store.state
});

export default connect(mapStateToProps)(App);
