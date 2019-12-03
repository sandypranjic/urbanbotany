import React, { Component } from 'react';
import './sass/app.scss';
import DisplayAllPlants from './DisplayAllPlants.js';
import dbRef from "./firebase.js";
import SearchForSpecificPlant from "./SearchForSpecificPlant.js";
import InfoForSpecificPlant from "./InfoForSpecificPlant.js";

class PlantSearch extends Component {
    constructor() {
        super();
        this.state = {
            showAllPlants: true,
            showSearchForASpecificPlant: false,
            userInput: "",
            showInfoForSpecificPlant: false,
            specificPlantScientificName: "",
            specificPlantCommonName: "",
            specificPlantImage: "",
            specificPlantFamily: "",
            toleratesLowLight: null, 
            toleratesMediumLight: null,
            toleratesHighLight: null,
            specificPlantWateringNeeds: "",
            specificPlantHumidity: "",
            specificPlantMaxGrowthInMetres: null,
            canPropagateByCutting: null,
            isToxic: null,
            currentPage: 1,
            previousPage: 0,
            plantsPerPage: 9,
        };
    }

    nextPage = () => {
        let totalNumberOfPlants = this.props.plantsProp.length;
        let plantsPerPage = this.state.plantsPerPage;
        if (this.state.currentPage < Math.ceil(totalNumberOfPlants / plantsPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1,
                previousPage: this.state.previousPage + 1,
            })
            let elmnt = document.querySelector(".searchBar");
            this.scrollTo(document.documentElement, elmnt.offsetTop, 600);
        };
    }

    previousPage = () => {
        if (this.state.currentPage !== 1) {
            this.setState({
                currentPage: this.state.currentPage - 1,
                previousPage: this.state.previousPage -1,
            })
            let elmnt = document.querySelector(".searchBar");
            this.scrollTo(document.documentElement, elmnt.offsetTop, 600);
        } else {
            this.setState({
                currentPage: 1,
                previousPage: 0,
            })
        }
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
                showSearchForASpecificPlant: true,
                showInfoForSpecificPlant: false,
            })
        }
    }

    showThisPlant = (scientificName, commonName, image, family, lowLight, mediumLight, highLight, wateringNeeds, humidity, maxGrowthInMetres, propagateByCutting, toxic) => {
        this.setState({
            showInfoForSpecificPlant: true,
            showAllPlants: false,
            showSearchForASpecificPlant: false,
            userInput: "",
            specificPlantScientificName: scientificName,
            specificPlantCommonName: commonName,
            specificPlantImage: image,
            specificPlantFamily: family,
            toleratesLowLight: lowLight, 
            toleratesMediumLight: mediumLight,
            toleratesHighLight: highLight,
            specificPlantWateringNeeds: wateringNeeds,
            specificPlantHumidity: humidity,
            specificPlantMaxGrowthInMetres: maxGrowthInMetres,
            canPropagateByCutting: propagateByCutting,
            isToxic: toxic,
        })
        console.log(scientificName, commonName, image, family);
        let elmnt = document.querySelector(".searchBar");
        this.scrollTo(document.documentElement, elmnt.offsetTop, 600);
    }

    goBackToAllPlants = () => {
        this.setState({
            showInfoForSpecificPlant: false,
            showAllPlants: true,
            showSearchForASpecificPlant: false,
            userInput: "",
            specificPlantScientificName: "",
            specificPlantCommonName: "",
            specificPlantImage: "",
            specificPlantFamily: "",
        })
    }

    scrollTo = (element, to, duration) => {
        if (duration <= 0) return;
        const difference = to - element.scrollTop;
        const perTick = difference / duration * 10;
    
        setTimeout( () => {
            element.scrollTop = element.scrollTop + perTick;
            if (element.scrollTop === to) return;
            this.scrollTo(element, to, duration - 10);
        }, 10);
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

                        {this.state.showAllPlants ? <div className="displayAllPlantsContainer"><div className="searchResultsHeader"><h2>Displaying All Plants</h2></div><DisplayAllPlants plantsProp={this.props.plantsProp} showThisPlantProp={this.showThisPlant} plantsPerPageProp={this.state.plantsPerPage} currentPageProp={this.state.currentPage} previousPageProp={this.state.previousPage} totalNumberOfPagesProp={this.state.totalPages} nextPageFunction={this.nextPage} previousPageFunction={this.previousPage} greyOutArrowsFunction={this.greyOutArrows} /></div> : null}

                        {this.state.showSearchForASpecificPlant ? <div className="displayAllPlantsContainer"><div className="searchResultsHeader"><h2>Displaying search results for {this.state.userInput}</h2></div><SearchForSpecificPlant searchQueryProp={this.state.userInput} plantsProp={this.props.plantsProp} showThisPlantProp={this.showThisPlant} goBackToAllPlantsProp={this.goBackToAllPlants} /></div> : null}


                        {this.state.showInfoForSpecificPlant ? <InfoForSpecificPlant specificPlantScientificNameProp={this.state.specificPlantScientificName} specificPlantCommonNameProp={this.state.specificPlantCommonName} specificPlantImageProp={this.state.specificPlantImage} specificPlantFamilyProp={this.state.specificPlantFamily} goBackToAllPlantsProp={this.goBackToAllPlants} lowLightProp={this.state.toleratesLowLight} mediumLightProp={this.state.toleratesMediumLight} highLightProp={this.state.toleratesHighLight} wateringNeedsProp={this.state.specificPlantWateringNeeds} humidityProp={this.state.specificPlantHumidity} maxGrowthProp={this.state.specificPlantMaxGrowthInMetres} propagationProp={this.state.canPropagateByCutting} toxicProp={this.state.isToxic} / > : null}
                    </div>

                </div>
            </React.Fragment>

        ) 
    }
};

export default PlantSearch;