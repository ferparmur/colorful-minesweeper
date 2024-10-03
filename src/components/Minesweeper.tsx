import React, {type CSSProperties} from "react";
import "../styles/minesweeper.scss";
import BoardObj from "../model/BoardObj";
import Cell from "./Cell";

export default function Minesweeper({numberOfColumns = 30, numberOfRows = 16, numberOfMines = 50}) {
    const boardStyle: CSSProperties = {
        "--columns": numberOfColumns,
        "--rows": numberOfRows,
    } as React.CSSProperties;

    const [boardObj, setBoardObj] = React.useState<BoardObj>(
        new BoardObj(numberOfColumns, numberOfRows, numberOfMines)
    );

    return (
        <div className="board" style={boardStyle}>
            {boardObj.board.map((cell) => (
                <Cell
                    key={`cell-${cell.cellIndex}`}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        boardObj.openCell(cell.cellIndex);
                        setBoardObj(boardObj.clone());
                    }}
                    onContextMenu={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        boardObj.flagCell(cell.cellIndex);
                        setBoardObj(boardObj.clone());
                    }}
                    cell={cell}
                />
            ))}
        </div>
    );
}
