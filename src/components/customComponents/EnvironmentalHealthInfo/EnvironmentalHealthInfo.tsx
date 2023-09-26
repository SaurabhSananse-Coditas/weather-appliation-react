// Import the CSS styles for this component
import "./EnvironmentalHealthInfo.styles.scss"

// Define a functional component called EnvironmentalHealthInfo
const EnvironmentalHealthInfo = () => {
    return (
        // The main container div for the component
        <div className="index-div">
            {/* Icon image */}
            <img className="index-div__icon" src="/src/assets/icons/index frame.svg" alt="enviroment info" />

            {/* Reading information */}
            <div className="index-div__reading">
                {/* Numeric value */}
                <span className="index-div__value">2/5</span>
                {/* State or description */}
                <span className="index-div__state">Moderate</span>
            </div>
        </div>
    )
}

// Export the EnvironmentalHealthInfo component as the default export
export default EnvironmentalHealthInfo;
