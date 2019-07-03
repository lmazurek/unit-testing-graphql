import React from "react"
import ReactDOM from "react-dom"

import "./styles.css"
import QueryTag from "./components/QueryTag"
import QueryTagWithVar from "./components/QueryTagWithVar"
import MutationTag from "./components/MutationTag"

function App() {
  return (
    <div className="App">
      <QueryTag />
      {/* <QueryTagWithVar /> */}
      <MutationTag />
    </div>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
