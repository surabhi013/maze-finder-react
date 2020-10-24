import * as React from 'react';
import './MazeMap.css';

type MazeMapProps = {
    grid: Array<Array<number>>;
    current: Array<number>;
    end: Array<number>;
}

const cellWidth = 50;
const cellColor = (value: number): string => {
    if (value) {
        return '#d9c429';
    }
    return '#63cf32'
}

const MazeMap = (props: MazeMapProps) => {
    const { grid, current, end } = props;
    const [ currentRow, currentCol ] = current;
    const [ endRow, endCol ] = end;
    const gridWidth = cellWidth*grid[0].length;
    const gridHeight = cellWidth*grid.length;

    return (
        <div className="maze-grid-container" style={{width: `${gridWidth}px`, height: `${gridHeight}px`, gridTemplateColumns: `repeat(${grid[0].length}, auto)`}}>
        {
            grid.map((row, rowIndex) => {
                return (
                    row.map((col, colIndex) => {
                        const isCurrentPos = currentRow === rowIndex && currentCol === colIndex;
                        const isEnd = endRow === rowIndex && endCol === colIndex;
                        return (
                            <div key={`cell-${rowIndex}${colIndex}`} className="maze-grid-item" style={{background: cellColor(col)}}>
                                {
                                    isCurrentPos ? <i className='fas fa-car-alt icon'></i> :
                                        isEnd && <i className='fas fa-bullseye icon'></i>
                                }
                            </div>
                        )
                    })  
                )
            })
        }
        </div>
    )
}

export default MazeMap;