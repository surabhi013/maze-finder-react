import React, { createRef } from 'react';
import './App.css';
import { useState } from "react";
import MazeDisplay from '../MazeDisplay/MazeDisplay';
import mazes from '../mazes.json';

const App = () => {
    const [selectedMaze, setSelectedMaze] = useState<number>(parseInt(localStorage.getItem('selectedMaze') || '0') || 0);
    const selectRef = createRef<HTMLSelectElement>();

    const changeMaze = (event: React.SyntheticEvent<HTMLSelectElement>):void => {
        localStorage.removeItem('lastPos');
        localStorage.setItem('selectedMaze', event.currentTarget.value);
        setSelectedMaze(Number(event.currentTarget.value));
        selectRef.current?.blur();
    }

    return(
        <div className="app">
            <div className="maze-option-list">
                <label htmlFor="maze-options">Select maze: </label>
                <select ref={selectRef} name="maze-options" onChange={changeMaze} defaultValue={selectedMaze}>
                  {mazes.map((maze, index) => {
                      return (
                          <option key={`maze-${index}`} value={index} onSelect={() => setSelectedMaze(index)}>
                              {maze.name}
                          </option>
                      );
                  })}
                </select>
            </div>
            <MazeDisplay maze={mazes[selectedMaze]} index={selectedMaze}/>
        </div>
    )
}

export default App;
