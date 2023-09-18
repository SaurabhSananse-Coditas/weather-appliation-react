import WeatherExtras from "../../components/panels/weather-extras/extras"
import WeatherDetails from "../../components/panels/WeatherDetails/WeatherDetails"
import './home.styles.scss';

const Home = () => {
    return(
        <div className="page">
          <WeatherDetails/>
          <WeatherExtras/>
        </div>
    )
}

export default Home;