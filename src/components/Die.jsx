import PropTypes from 'prop-types';

export default function Die(props){
    const styles = {
        backgroundColor: props.isHeld ? '#59E391' : 'white'
    };
    
    Die.propTypes = {
        hold: PropTypes.func.isRequired,
        isHeld: PropTypes.bool.isRequired,
        value: PropTypes.number.isRequired,
        key: PropTypes.string
    };

    return (
        <button
            onClick={props.hold}
            className="die" 
            style={styles} 
            key={props.key}
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.value}, ${props.isHeld ? 'held' : 'not held'}`}
        >{props.value}</button>
    )
}