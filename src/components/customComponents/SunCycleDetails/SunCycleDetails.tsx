// Import the CSS styles for this component
import "./SunCycleDetails.styles.scss";

// Import the 'moment' library for date and time formatting
import moment from 'moment'

// Define a functional component called SunCycleDetails
const SunCycleDetails: React.FC<{ className: string; showLargeSizeWidget: boolean; sunSetOrsunRise: number }> = (props) => {
    // Destructure the props to access their values
    const { className, showLargeSizeWidget, sunSetOrsunRise } = props;

    return (
        // The main container div for the time card, with a class determined by the 'className' prop
        <div className={`time-card ${className}`}>
            {/* Icon for displaying time */}
            <img className="time-card__icon" src="/src/assets/icons/clock-hands.svg" alt="clock" />
            
            <div className="time-card__text">
                {/* Conditional rendering based on the 'sunSetOrsunRise' prop */}
                {sunSetOrsunRise ? (
                    // Display formatted time using 'moment' if 'sunSetOrsunRise' is provided
                    <span className="time-card__main-time">{moment.unix(sunSetOrsunRise).format('hh:mm')} {showLargeSizeWidget}</span>
                ) : (
                    // Display 'NA' if 'sunSetOrsunRise' is not provided
                    'NA'
                )}
            </div>
        </div>
    );
};

// Export the SunCycleDetails component as the default export
export default SunCycleDetails;
