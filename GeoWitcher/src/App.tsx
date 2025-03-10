import Map from './components/Map/Map'

import './App.scss'

function App() {
    return (
        <>
            <h1>Vite + React</h1>
            <Map location="white_orchard" rows={4} cols={5} />
        </>
    )
}

export default App
