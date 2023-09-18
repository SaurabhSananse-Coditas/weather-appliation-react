// Import the CSS styles for this component
import "./WeatherDetailsCard.styles.scss";

// Define a functional component called WeatherDetailsCard
const WeatherDetailsCard: React.FC<{ day: string; temp: number; ferenheitSelected: boolean }> = ({ day, temp, ferenheitSelected }) => {
    return (
        // The main container div for the card
        <div className="card">
            {/* Temperature display */}
            <span className="card__temperature">{ferenheitSelected ? temp + '°F' : temp + '°C'}</span>
            
            {/* Weather icon */}
            <img className="card__icon" src="/src/assets/icons/Group 650.svg" alt="" />
            
            {/* Day of the week */}
            <span className="card__day">
                {day}
            </span>
        </div>
    );
};

// Export the WeatherDetailsCard component as the default export
export default WeatherDetailsCard;
