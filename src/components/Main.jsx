import Die from './Die';
import { useEffect, useState, useRef } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

export default function Main(){
    const [dice, setDice] = useState(() => generateAllNewDice());
    const buttonRef = useRef(null);

    const gameWon = dice.every(die => die.isHeld) &&
                    dice.every(die => die.value === dice[0].value);

    useEffect(() => {
        buttonRef.current.focus();
    }, [gameWon]);

    function generateAllNewDice(){
        return new Array(10)
            .fill(0)
            .map(() => ({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            }));
    }

    function rollAllDice(){
        if(gameWon) setDice(generateAllNewDice());
        setDice(oldDice => oldDice.map(
            dieObj => 
                {
                    if(dieObj.isHeld) return dieObj;
                    return {
                        ...dieObj,
                        value: Math.ceil(Math.random() * 6)
                    }
                }
            )
        );
    }

    function holdDie(id){
        setDice(oldDice => oldDice.map(dieObj => {
            if(dieObj.id !== id) return dieObj;
            return {
                ...dieObj,
                isHeld: !dieObj.isHeld
            }
        }));
    }

    const diceElements = dice.map(dieObj => (
        <Die
            hold={()=>holdDie(dieObj.id)}
            key={dieObj.id} 
            value={dieObj.value} 
            isHeld={dieObj.isHeld}
        />
    ));

    return (
        <main>
            <div className="sr-only" aria-live='polite'>
                {gameWon && <p>Congratulations! You won! Press &quot;New Game&quot; to start again.</p>}
            </div>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                ref={buttonRef}
                onClick={rollAllDice}
                className='roll-button'
            >{gameWon? "New Game" : "Roll Dice"}</button>
            {gameWon && <Confetti 
                width={window.innerWidth - 10}
                height={window.innerHeight - 10}
            />}
        </main>
    )
}