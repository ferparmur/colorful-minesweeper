export default function Cell({cell, onClick, onContextMenu}) {
    return (
        <button
            className={`cell ${cell.isTriggeredMine ? 'indicator-explosion' : cell.isFlagged ? 'indicator-flag' : cell.isOpen ? cell.hasMine ? "indicator-mine" : cell.closeMines.length > 0 ? `open indicator-${cell.closeMines.length}` : 'open' : ''}`}
            onClick={(e) => onClick(e)}
            onContextMenu={(e) => onContextMenu(e)}
        >
            {cell.isFlagged ? '►' : !cell.isOpen ? '' : cell.hasMine ? "✖︎" : cell.closeMines.length > 0 ? cell.numberOfCloseMines : ""}
        </button>
    );
}
