import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { accessAction } from "../redux/actions";
import { Link } from 'react-router-dom';
import { Button } from "../components/Button";

const LoginPage = ({ accessAction }) => {
  const [privateKeyValue, setPrivateKeyValue] = useState();
  const [publicKeyValue, setPublicKeyValue] = useState();

  const inputChange = event => {
    if (event.target.placeholder === 'private_key') {
      setPrivateKeyValue(event.target.value);
    } else if (event.target.placeholder === 'public_key') {
      setPublicKeyValue(event.target.value);
    }
  }

  return (
    <form className="login-page" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }} >
      <h1>Dados de acesso</h1>
      <input type="text" placeholder="private_key" onChange={(e) => inputChange(e)} style={{ margin: '10px', width: '400px' }} />
      <input type="text" placeholder="public_key" onChange={(e) => inputChange(e)} style={{ margin: '10px', width: '400px' }} />
      <Link to='/home'>
        <Button style={{ margin: '10px' }}
          onClick={() => accessAction(privateKeyValue, publicKeyValue)}
        >Acessar
        </Button>
      </Link>
    </form>
  )
}

const mapStateToProps = store => ({
  newValue: store.state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ accessAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
