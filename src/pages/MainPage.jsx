import React from "react";
import { Link } from "react-router-dom";
import { Table } from "../components/Table";

export const MainPage = () => {
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

export default MainPage;
