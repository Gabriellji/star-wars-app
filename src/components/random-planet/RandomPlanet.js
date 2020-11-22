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

    constructor() {
        super();
        this.updatePlanet();
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

    updatePlanet() {
        const id = Math.floor(Math.random() * 21) + 2;
        this.SwapiService.getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError);
    }

    render() {
        const { planet, loading, error } = this.state;

        const hasData = !(loading || error);
        const errorMessage = error ? <Error /> : null; 
        const spinner = loading ? <Spiner /> : null;
        const content = hasData ? <PlanetView planet={planet} /> : null;
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

    return (
        <React.Fragment>
            <img className="planet-image"
            
                    src={ id ? `https://starwars-visualguide.com/assets/img/planets/${id}.jpg` 
                            : 'https://starwars-visualguide.com/assets/img/big-placeholder.jpg'}
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