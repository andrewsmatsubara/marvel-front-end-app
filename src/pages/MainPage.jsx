import React from "react";
import { connect } from "react-redux";

class MainPage extends React.Component {
  render() {
    const { newValue } = this.props;
    return (
      <div className="main-page">
        <h1>Main Page</h1>
        {console.log(newValue)}
      </div>
    )
  }
}

const mapStateToProps = store => ({
  newValue: store.state
});

export default connect(mapStateToProps)(MainPage);
