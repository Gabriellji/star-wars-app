import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spiner from '../spinner';
import Error from '../error-indicator';
import './RandomPlanet.css';

class RandomPlanet extends Component {

    SwapiService = new SwapiService();

    state = {
        planet: {},
        loading: true
    };

    componentDidMount() {
        this.updatePlanet();
        this.interval = setInterval(this.updatePlanet, 2500);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onPlanetLoaded = (planet) => {
        this.setState({
            planet,
            loading: false,
            error: false
        });
    };

    onError = (err) => {
        this.setState({
            loading: false,
            error: true
        });
    }

    updatePlanet= () => {
        const id = Math.floor(Math.random() * 17) + 2; //Math.floor(Math.random() * 21) + 2;
        this.SwapiService.getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError);
    }

    render() {
        const { planet, loading, error } = this.state;

        const hasData = !(loading || error);
        const errorMessage = error ? <Error /> : null; 
        const spinner = loading ? <Spiner /> : null;
        const content = hasData ? <PlanetView planet={planet} error={this.state.error} /> : null;
        return (
            <div className="random-planet jumbotron rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

const PlanetView = ({ planet }) => {

    const { id, name, population, rotationPeriod, diameter } = planet;

    const onImgError = (e) => {
        try {
            e.target.onerror = null;
            e.target.src='https://starwars-visualguide.com/assets/img/big-placeholder.jpg'
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <React.Fragment>
            <img className="planet-image"
                    onError={onImgError}
                    src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
                    alt={name} />
                <div>
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Population</span>
                            <span>{population}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Rotation Period</span>
                            <span>{rotationPeriod}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Diameter</span>
                            <span>{diameter}</span>
                        </li>
                    </ul>
                </div>
        </React.Fragment>
    )
}

export default RandomPlanet;