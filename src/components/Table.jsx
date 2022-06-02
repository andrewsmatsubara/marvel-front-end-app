import React from "react"
import { getCharacter } from '../util/util'

export default class Table extends React.Component {
  componentDidMount() {
    getCharacter();
  }
  render() {
    return (
      <table>
        <tr>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Última atualização</th>
        </tr>
        { }
      </table>
    )
  }
}