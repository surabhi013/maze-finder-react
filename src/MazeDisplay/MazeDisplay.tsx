import * as React from 'react'; 
import MazeControls from '../MazeControls/MazeControls';
import MazeMap from '../MazeMap/MazeMap';
import './MazeDisplay.css';

type Maze = {
    name: string;
    map: number[][];
    start: number[];
    end: number[]
};

type MazeDisplayProps = {
    maze: Maze;
    mazeIndex: number;
}

type State = {
    position: Array<number>;
    success: boolean;
    error: boolean;
}

enum ActionTypes {
    SetPosition,
    SetSuccess,
    SetError,
    Reset
}

type Action =
    | { type: ActionTypes.SetPosition; value: {position: Array<number>, start: Array<number>, end: Array<number>, mazeIndex: number} }
    | { type: ActionTypes.Reset; value: Array<number> }
    | { type: ActionTypes.SetSuccess }
    | { type: ActionTypes.SetError };


const MazeReducer = (state: State, action: Action): State => {
    switch(action.type) {
        case ActionTypes.SetPosition: {
            const { position, start, end } = action.value;
            let success = false;
            if(position[0] === end[0] && position[1] === end[1]) {
                success = true;
            }
            const newPos = success ? start : position;
            localStorage.setItem('lastPos', JSON.stringify(newPos));
            return {
                ...state,
                position: newPos,
                error: false,
                success
            }
        }
        case ActionTypes.SetError: {
            return {
                ...state,
                error: true
            }
        }
        case ActionTypes.Reset: {
            return {
                ...state,
                position: action.value,
                error: false,
                success: false
            }
        }
        default:
            return state;
    }
}

const MazeDisplay = (props: MazeDisplayProps) => {
    const { maze, mazeIndex } = props;
    const { start, end, map } = maze;
    const lastPosition = localStorage.getItem('lastPos');

    const initialState: State = {
        position: lastPosition ? JSON.parse(lastPosition) : start,
        success: false,
        error: false
    };

    const [mazeState, dispatch] = React.useReducer(MazeReducer, initialState);

    React.useEffect(() => {
        if(!lastPosition) {
            dispatch({type: ActionTypes.Reset, value: start});
        } else {
            dispatch({ type: ActionTypes.SetPosition, value: {position: JSON.parse(lastPosition), start, end, mazeIndex} });
        }
    }, [end, lastPosition, mazeIndex, start]);

    const { position } = mazeState;

    const dispatchAction = React.useCallback((validMove: boolean, newPos: Array<number>): void => {
        if(validMove) {
            dispatch({ type: ActionTypes.SetPosition, value: {position: newPos, start, end, mazeIndex} });
        } else {
            dispatch({ type: ActionTypes.SetError });
        }
    }, [end, mazeIndex, start]);

    const updatePosition = React.useCallback((action: string) => {
        let validMove, newPos;
        const [row, col] = position;
        switch(action) {
            case 'UP':
                validMove = row !== 0 && map[row - 1][col] === 1;
                newPos = [row - 1, col];
                dispatchAction(validMove, newPos);
                break;
            case 'DOWN':
                validMove = row !== map.length - 1 && map[row + 1][col] === 1;
                newPos = [row + 1, col];
                dispatchAction(validMove, newPos);
                break;
            case 'LEFT':
                validMove = col !== 0 && map[row][col - 1] === 1;
                newPos = [row, col - 1];
                dispatchAction(validMove, newPos);
                break;
            case 'RIGHT':
                validMove = col !== map[0].length + 1 && map[row][col + 1] === 1;
                newPos = [row, col + 1];
                dispatchAction(validMove, newPos);
                break;
        }
    }, [map, position, dispatchAction]);

    const cellColor = (value: number): string => {
        if (value) {
            return '#d9c429';
        }
        return '#63cf32'
    }
    console.log(cellColor);

    return (
        <div className="maze-container">
            <div className="messages">
            {mazeState.success ? 
                <div className="success">
                    Congratulations, you won!
                </div> :
                mazeState.error && <div className="error"> Invalid move! </div>
            }
            </div>

            <div className="maze-area">
                <MazeMap grid={map} current={position} end={end}></MazeMap>
                {/* <table className="maze">
                    <tbody>
                        {map.map((row, rowIndex) => 
                            {
                                return (
                                <tr key={`row-${rowIndex}`}>
                                    {row.map((col, colIndex) => {
                                        const currentPos = position[0] === rowIndex && position[1] === colIndex;
                                        const finalPos = end[0] === rowIndex && end[1] === colIndex;
                                        return (
                                            <td key={`col-${colIndex}`} style={{background: cellColor(col)}} className="maze-cell">
                                                {
                                                    currentPos ? <i className='fas fa-car-alt icon'></i> :
                                                        finalPos && <i className='fas fa-bullseye icon'></i>
                                                }
                                            </td>
                                        )}
                                    )}
                                </tr>
                            )}
                        )}
                    </tbody>
                </table> */}
            </div>
            
            <div className="maze-controls">
                <MazeControls updatePosition={updatePosition}></MazeControls>
                <button className="maze-reset" onClick={() => dispatch({ type: ActionTypes.Reset, value: start })}>RESET</button>
            </div>
            
        </div>
    )

}

export default MazeDisplay;