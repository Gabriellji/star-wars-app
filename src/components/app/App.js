import React, { Component } from 'react';
import Header from '../header';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import RandomPlanet from '../random-planet';

import './App.css';

class App extends Component {

    state = {
        showRandomPlanet: true,
        selectedPersen: null
    };

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        });
    };

    onPersonSelected = (id) => {
        this.setState({
            selectedPersen: id
        });
    }

    render() {
        const { showRandomPlanet } = this.state;

        return (
            <div className="wrap">
                <Header />
                { showRandomPlanet && <RandomPlanet />}
                <button
                    className="toggle-planet btn btn-warning btn-lg"
                    onClick={this.toggleRandomPlanet}>
                    Toggle Random Planet
                </button>
                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList onItemSelected={this.onPersonSelected}/>
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId={this.state.selectedPersen}/>
                    </div>
                </div>
            </div>
        )
    };

};

export default App;