import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { accessAction } from "../redux/actions";

class LoginPage extends React.Component {
  state = {
    privateKeyValue: '',
    publicKeyValue: ''
  }

  inputChange = event => {
    if (event.target.placeholder === 'private_key') {
      this.setState({
        privateKeyValue: event.target.value
      });
    } else if (event.target.placeholder === 'public_key') {
      this.setState({
        publicKeyValue: event.target.value
      });
    }
  }

  render() {
    const { accessAction } = this.props;
    const { privateKeyValue, publicKeyValue } = this.state;

    return (
      <div className="login-page">
        <input type="text" placeholder="private_key" onChange={this.inputChange} />
        <input type="text" placeholder="public_key" onChange={this.inputChange} />
        <button onClick={() => accessAction(privateKeyValue, publicKeyValue)}>Acessar</button>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  newValue: store.state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ accessAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
