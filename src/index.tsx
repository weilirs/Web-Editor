import * as esbuild from 'esbuild-wasm'
import ReactDOM from 'react-dom'
import { useState, useEffect, useRef } from 'react'
import { unpkgPlugin } from './plugins/unpkg-plugin';


const App = () => {
    const ref = useRef<any>()
    const [input,setInput] = useState('')
    const [code, setCode] = useState('')

    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: '/esbuild.wasm'
        })
    }

    useEffect(() => {
        startService()
    },[])

    const onClick = async () => {
        if(!ref.current) {
            return
        }

        const result = await ref.current.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPlugin()],
            define: {
                'process_env_NODE_ENV': '"production"',
                global: 'window'
            }
        })

        setCode(result.outputFiles[0].text)
    }
    return (
        <div>
            <textarea value={input} onChange={(e) => setInput(e.target.value)}>

            </textarea>

            <button onClick={onClick}>
                Submit
            </button>
            <pre>{code}</pre>
        </div>
    )
}
ReactDOM.render(<App />, document.querySelector('#root'))