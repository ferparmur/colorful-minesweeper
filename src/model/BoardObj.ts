import {generateRandomNumbers} from "./utils.ts";

export default class BoardObj {
    private readonly numberOfRows: number;
    private readonly numberOfCols: number;
    private readonly numberOfCells: number;
    private minedCells: Array<number>;
    private readonly numberOfMines: number;
    private _board;
    private gameState: string = '';

    constructor(numberOfCols: number, numberOfRows: number, numberOfMines: number, board = null, gameState = 'new', minedCells: Array<number> = []) {
        this.gameState = gameState;
        this.numberOfCols = numberOfCols;
        this.numberOfRows = numberOfRows;
        this.numberOfCells = numberOfCols * numberOfRows;
        this.minedCells = minedCells;

        // Ensure that the first click can happen on an empty cell
        this.numberOfMines = numberOfMines < this.numberOfCells - 9 ? numberOfMines : this.numberOfCells - 9;

        this._board = board ?? [];
        if (this._board.length === 0) {
            // Initialize the board if not provided
            for (let cellIndex = 0; cellIndex < this.numberOfCells; cellIndex++) {
                const currentCellCloseCells = this.getCloseCells(cellIndex);
                const currentCell = {
                    cellIndex: cellIndex,
                    hasMine: false,
                    isFlagged: false,
                    isOpen: false,
                    isTriggeredMine: false,
                    closeCells: currentCellCloseCells,
                    closeMines: [],
                    numberOfCloseMines: 0,
                };
                this._board.push(currentCell);
            }
        }
    }

    get board() {
        return this._board;
    }

    openCell(cellIndex: number) {
        if (this.gameState === 'new') {
            this.initGame(cellIndex);
        } else if (this._board[cellIndex].isOpen || this.gameState !== 'started') {
            return;
        }

        this._board[cellIndex].isOpen = true;
        this._board[cellIndex].isFlagged = false;

        if (this._board[cellIndex].closeMines.length === 0) {
            this._board[cellIndex].closeCells.map((cellIndex) => {
                this.openCell(cellIndex);
            });
        }

        if (this._board[cellIndex].hasMine) {
            this.looseGame(cellIndex);
        }
    }

    flagCell(cellIndex: number) {
        if (this.gameState !== 'started') {
            return;
        }
        this._board[cellIndex].isFlagged = !this._board[cellIndex].isOpen ? !this._board[cellIndex].isFlagged : false;
    }

    clone(): BoardObj {
        return new BoardObj(this.numberOfCols, this.numberOfRows, this.numberOfMines, this._board, this.gameState, this.minedCells);
    }

    private initGame(startingCellIndex: number) {
        const startingCell = this._board[startingCellIndex];
        const exclude = startingCell.closeCells
        exclude.push(startingCellIndex)
        this.minedCells = generateRandomNumbers(this.numberOfMines, this.numberOfCells, exclude).sort((a, b) => a - b);
        this._board = this._board.map((cell) => {
            const currentCellCloseMines = this.getCloseMines(cell.closeCells);
            cell.closeMines = currentCellCloseMines;
            cell.hasMine = this.minedCells.includes(cell.cellIndex);
            cell.numberOfCloseMines = currentCellCloseMines.length;
            return cell;
        });

        this.gameState = 'started';
    }

    private looseGame(triggeredMineIndex: number) {
        this._board[triggeredMineIndex].isTriggeredMine = true;
        this.gameState = 'lost';
        console.log(this.minedCells);
        this.minedCells.map(cellIndex => {
            console.log(cellIndex);
            this._board[cellIndex].isOpen = true;
        })
    }

    private getCloseMines(currentCellCloseCells: Array<number>) {
        return currentCellCloseCells.filter((cellIndex: number) => this.minedCells.includes(cellIndex));
    }

    private getCloseCells(cellIndex: number) {
        const [x, y] = this.getCellCoordinates(cellIndex);
        const northWestCell = this.getCellIndex(x - 1, y - 1);
        const northCell = this.getCellIndex(x, y - 1);
        const northEastCell = this.getCellIndex(x + 1, y - 1);
        const westCell = this.getCellIndex(x - 1, y);
        const eastCell = this.getCellIndex(x + 1, y);
        const southWestCell = this.getCellIndex(x - 1, y + 1);
        const southCell = this.getCellIndex(x, y + 1);
        const southEastCell = this.getCellIndex(x + 1, y + 1);

        return [
            northWestCell,
            northCell,
            northEastCell,
            westCell,
            eastCell,
            southWestCell,
            southCell,
            southEastCell,
        ].filter((cellIndex: number | null) => cellIndex !== null);
    }

    private getCellCoordinates(cellIndex: number) {
        const rowIndex = Math.floor(cellIndex / this.numberOfCols);
        const colIndex = cellIndex % this.numberOfCols;
        return [colIndex, rowIndex];
    }

    private getCellIndex(long: number, lat: number) {
        if (long < 0 || long > this.numberOfCols - 1 || lat < 0 || lat > this.numberOfRows - 1) {
            return null;
        }
        return lat * this.numberOfCols + long;
    }
}
