import * as esbuild from "esbuild-wasm"
import ReactDOM from "react-dom"
import { useState, useEffect, useRef } from "react"
import { unpkgPlugin } from "./bundler/plugins/unpkg-plugin"
import { fetchPlugin } from "./bundler/plugins/fetch-plugin"
import CodeEditor from "./components/code-editor"
import CodeCell from "./components/code-cell"

const App = () => {
  return (
    <div>
      <CodeCell />
    </div>
  )
}
ReactDOM.render(<App />, document.querySelector("#root"))
