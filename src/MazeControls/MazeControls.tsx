import * as React from 'react'; 
import './MazeControls.css';

type MazeControlProps = {
    updatePosition: Function;
}

const MazeControls = (props: MazeControlProps) => {
    const { updatePosition } = props;

    React.useEffect(() => {
        const downHandler = ({ key }: { key: string }) => {
            if (key === 'ArrowDown') {
                updatePosition('DOWN');
            }
            if (key === 'ArrowRight') {
                updatePosition('RIGHT');
            }
            if (key === 'ArrowUp') {
                updatePosition('UP');
            }
            if (key === 'ArrowLeft') {
                updatePosition('LEFT');
            }
        }
        window.addEventListener('keydown', downHandler);
        return () => {
            window.removeEventListener('keydown', downHandler);
        };
    }, [updatePosition]);
    
    return (
        <div>
            <i className='fas fa-arrow-alt-circle-up arrow up' onClick={() => updatePosition('UP')}></i>
            <div className='center-row'>
                <i className='fas fa-arrow-alt-circle-left arrow left' onClick={() => updatePosition('LEFT')}></i>
                <i className='fas fa-arrow-alt-circle-right arrow right' onClick={() => updatePosition('RIGHT')}></i>
            </div>
            <i className='fas fa-arrow-alt-circle-down arrow down' onClick={() => updatePosition('DOWN')}></i>
        </div>
    )
}

export default MazeControls;