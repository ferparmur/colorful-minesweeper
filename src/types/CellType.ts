export interface CellType {
    cellIndex: number;
    hasMine: boolean;
    isFlagged: boolean;
    isOpen: boolean;
    isTriggeredMine: boolean;
    closeCells: number[];
    closeMines: number[];
    numberOfCloseMines: number;
}
