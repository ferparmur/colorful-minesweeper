import Minesweeper from "./components/Minesweeper.tsx";

function App() {
    return (
        <>
            <header>
                <hgroup>
                    <h1>
                        Colorful Minesweeper
                    </h1>
                    <p>by <a href="https://www.fparedes.com">Fernando Paredes</a></p>
                </hgroup>

                <div className="options-panel">
                    <label>Preset</label>
                    <select>
                        <option value="1">1</option>
                    </select>

                    <label>Rows</label>
                    <input type="number"/>

                    <label>Columns</label>
                    <input type="number"/>

                    <label>Mines</label>
                    <input type="number"/>

                    <label>Theme</label>
                    <select>
                        <option value="neon">Neon</option>
                        <option value="neon">Outrun</option>
                        <option value="neon">Peach</option>
                    </select>
                </div>
            </header>
            <main>
                <Minesweeper/>
            </main>

        </>
    )
}

export default App
