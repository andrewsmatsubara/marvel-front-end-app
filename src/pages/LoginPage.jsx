import React from "react";

class LoginPage extends React.Component {
  render() {
    return (
      <div className="login-page">
        <input type="text" placeholder="private_key" />
        <input type="text" placeholder="public_key" />
        <button>Acessar</button>
      </div>
    )
  }
}

export default LoginPage;
