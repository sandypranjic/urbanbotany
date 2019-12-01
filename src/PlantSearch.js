import React, { Component } from 'react';
import './sass/app.scss';
import DisplayAllPlants from './DisplayAllPlants';
import dbRef from "./firebase.js";
import SearchForSpecificPlant from "./SearchForSpecificPlant.js";

class PlantSearch extends Component {
    constructor() {
        super();
        this.state = {
            showAllPlants: true,
            userInput: "",
        };
    }

    getUserInput = (event) => {
        this.setState({
            userInput: event.target.value,
        })
    }

    saveUserInput = (event) => {
        event.preventDefault();
        const searchQuery = this.state.userInput;
        if (searchQuery !== "") {
            console.log(searchQuery);
            this.setState({
                showAllPlants: false,
            })
        }
    }

    render() {
        console.log(dbRef);
        return(
            <React.Fragment>
                <div className="plantSearchContainer">
                    <div className="plantSearchHeader">
                        <h1>Search for a Plant</h1>
                        <p>The Urban Botany database contains care instructions for over 100 of the most common houseplants, so you know how to give your plant the optimal care it deserves. Simply search either by scientific name or by common name, and if we have care info for that plant we’ll share all of our knowledge with you. We also connect you to the Trefle database, which collects data from a variety of institutions like the USDA and the Kew Botanical Gardens. Even if we don’t have specific care instructions on the super cool rare plant you search, we’ll still be able to show you what data the scientific community has.</p>
                    </div>
                    <div className="searchBar">
                        <form onSubmit={this.saveUserInput}>
                            <input type="text" className="plantSearchInput" id="plantQuery" placeholder="Search for a Plant" onChange={this.getUserInput}></input>
                            <button type="submit"><i className="fas fa-search"></i></button>
                        </form>
                    </div>

                    <div className="searchResults">

                        {this.state.showAllPlants ? <DisplayAllPlants plantsProp={this.props.plantsProp}></DisplayAllPlants> : <div className="displayAllPlantsContainer"><SearchForSpecificPlant searchQueryProp={this.state.userInput} plantsProp={this.props.plantsProp} /></div>}
                    </div>


                </div>
            </React.Fragment>

        ) 
    }
};

export default PlantSearch;