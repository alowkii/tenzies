import PropTypes from 'prop-types';

export default function Die({ hold, value, isHeld }) {
    const styles = { backgroundColor: isHeld ? '#59E391' : 'white' };

    return (
        <button
            onClick={hold}
            className="die"
            style={styles}
            aria-pressed={isHeld}
            aria-label={`Die with value ${value}, ${isHeld ? 'held' : 'not held'}`}
        >
            {value}
        </button>
    );
}

Die.propTypes = {
    hold: PropTypes.func.isRequired,
    isHeld: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
};