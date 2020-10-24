import * as React from 'react'; 
import MazeControls from '../MazeControls/MazeControls';
import MazeMap from '../MazeMap/MazeMap';
import './MazeDisplay.css';

type Maze = {
    name: string;
    map: Array<Array<number>>;
    start: Array<number>;
    end: Array<number>;
};

type MazeDisplayProps = {
    maze: Maze;
    index: number;
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
    | { type: ActionTypes.SetPosition; value: { position: Array<number>, end: Array<number>, start: Array<number> } }
    | { type: ActionTypes.Reset; value: Array<number> }
    | { type: ActionTypes.SetSuccess }
    | { type: ActionTypes.SetError };


const MazeReducer = (state: State, action: Action): State => {
    switch(action.type) {
        case ActionTypes.SetPosition: {
            const { position, end, start } = action.value;
            let success = false;
            if(position[0] === end[0] && position[1] === end[1]) {
                success = true;
                localStorage.setItem('lastPos', JSON.stringify(start));
            } else {
                localStorage.setItem('lastPos', JSON.stringify(position));
            }
            return {
                ...state,
                position,
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
            localStorage.removeItem('lastPos');
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

const dispatchAction = (validMove: boolean, newPos: Array<number>, dispatch: Function, end: Array<number>, start?: Array<number>): void => {
    if(validMove) {
        dispatch({ type: ActionTypes.SetPosition, value: {position: newPos, end, start} });
    } else {
        dispatch({ type: ActionTypes.SetError });
    }
};

const MazeDisplay = (props: MazeDisplayProps) => {
    const { maze, index } = props;
    const { start, end, map } = maze;
    const lastPosition = localStorage.getItem('lastPos');

    const initialState: State = {
        position: lastPosition ? JSON.parse(lastPosition) : start,
        success: false,
        error: false
    };

    const [mazeState, dispatch] = React.useReducer(MazeReducer, initialState);
    const { position, success, error } = mazeState;

    React.useEffect(() => {
        const lastIndex = localStorage.getItem('selectedMaze');
        const lastPos = localStorage.getItem('lastPos');
        if(lastIndex && !lastPos && index === parseInt(lastIndex)) {
            dispatch({type: ActionTypes.Reset, value: start});
        }
    }, [index, start]);

    const updatePosition = React.useCallback((action: string) => {
        let validMove, newPos;
        const [row, col] = position;
        switch(action) {
            case 'UP':
                validMove = row !== 0 && map[row - 1][col] === 1;
                newPos = [row - 1, col];
                dispatchAction(validMove, newPos, dispatch, end, start);
                break;
            case 'DOWN':
                validMove = row !== map.length - 1 && map[row + 1][col] === 1;
                newPos = [row + 1, col];
                dispatchAction(validMove, newPos, dispatch, end, start);
                break;
            case 'LEFT':
                validMove = col !== 0 && map[row][col - 1] === 1;
                newPos = [row, col - 1];
                dispatchAction(validMove, newPos,dispatch ,end, start);
                break;
            case 'RIGHT':
                validMove = col !== map[0].length + 1 && map[row][col + 1] === 1;
                newPos = [row, col + 1];
                dispatchAction(validMove, newPos, dispatch, end, start);
                break;
        }
    }, [position, map, end, start]);

    return (
        <div className="maze-container">
            <div className="messages">
            { success ? 
                <div className="success">
                    Congratulations, you won!
                </div> :
                 error && <div className="error"> Invalid move! </div>
            }
            </div>

            <div className="maze-area">
                <MazeMap grid={map} current={position} end={end}></MazeMap>
            </div>
            
            <div className="maze-controls">
                <MazeControls updatePosition={updatePosition}></MazeControls>
                <button className="maze-reset" onClick={() => dispatch({ type: ActionTypes.Reset, value: start })}>RESET</button>
            </div>
            
        </div>
    )

}

export default MazeDisplay;