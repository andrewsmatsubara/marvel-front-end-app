import React from "react";
import { Link } from "react-router-dom";
import Table from "../components/Table";

class MainPage extends React.Component {
  render() {
    return (
      <div className="main-page">
        <Table />
        <Link to='/'>
          <button>
            Voltar
          </button>
        </Link>
      </div >
    )
  }
}

export default MainPage;
