import Die from './Die';
import { useEffect, useState, useRef } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import Timer from './Timer';

export default function Main() {
    const [dice, setDice] = useState(generateAllNewDice);
    const [gameWon, setGameWon] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [lastTime, setLastTime] = useState(0);
    const buttonRef = useRef(null);

    useEffect(() => {
        setGameWon(
            dice.every(die => die.isHeld) && 
            dice.every(die => die.value === dice[0].value)
        );
    }, [dice]);

    useEffect(() => {
        if (gameWon) buttonRef.current.focus();
    }, [gameWon]);

    function generateAllNewDice() {
        return new Array(10).fill(0).map(() => ({
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid(),
        }));
    }

    function rollAllDice() {
        if (gameWon) {
            setDice(generateAllNewDice());
            return;
        }
        setDice(oldDice =>
            oldDice.map(die => (die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }))
        );
    }

    function holdDie(id) {
        if (!hasStarted) setHasStarted(true);
        setDice(oldDice =>
            oldDice.map(die => (die.id === id ? { ...die, isHeld: !die.isHeld } : die))
        );
    }


    return (
        <main>
            <div className="sr-only" aria-live="polite">
                {gameWon && 
                    <p>Congratulations! You won! Press &quot;New Game&quot; to start again.</p>
                }
            </div>
            
            <div className="dice-container">
                {dice.map(die => (
                    <Die 
                        key={die.id} 
                        hold={() => holdDie(die.id)} 
                        value={die.value} 
                        isHeld={die.isHeld} 
                    />
                ))}
            </div>

            <button ref={buttonRef} onClick={rollAllDice} className="roll-button">
                {gameWon ? 'New Game' : 'Roll Dice'}
            </button>

            {gameWon && 
                <Confetti 
                    width={window.innerWidth - 10} 
                    height={window.innerHeight - 10} 
                />
            }
            
            <Timer 
                gameWon={gameWon}
                hasStarted={hasStarted}
                setLastTime={setLastTime}
            />

            {(lastTime !== 0) &&
                <div className="last-time" aria-label='Last time'>
                    <p>{gameWon ? "You finished in":"Last finished time"}: {lastTime}s</p>
                </div>
            }
        </main>
    );
}