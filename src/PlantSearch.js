import React, { Component } from 'react';
import './sass/app.scss';
import DisplayAllPlants from './DisplayAllPlants.js';
import dbRef from "./firebase.js";
import SearchForSpecificPlant from "./SearchForSpecificPlant.js";
import InfoForSpecificPlant from "./InfoForSpecificPlant.js";

// The constructor in this component holds all the info I need if the user wants care instructions for a plant. I load the data from my database into App.js, and then I can use the plants state (an array) and pass in data from my state into a function (showThisPlant()) that waits for an on-click to pass this data down to the InfoForSpecificPlant.js component.

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
            repotting: null,
            altTag: "",
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
            this.setState({
                showAllPlants: false,
                showSearchForASpecificPlant: true,
                showInfoForSpecificPlant: false,
            })
        }
    }

    showThisPlant = (scientificName, commonName, image, family, lowLight, mediumLight, highLight, wateringNeeds, humidity, maxGrowthInMetres, propagateByCutting, toxic, alt, repotting) => {
        let elmnt = document.querySelector(".searchBar");
        this.scrollTo(document.documentElement, elmnt.offsetTop, 600);
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
            altTag: alt,
            repottingNeeds: repotting,
        })
    }


    // When the user clicks on a plant for care instructions, there's a button on the top they can click on to go back to the list of all plants. It's controlled by the states set below and is triggered by an on-click.
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
        return(
            <React.Fragment>
                <div className="plantSearchContainer">
                    <div className="plantSearchHeader">
                        <h1>Search for a Plant</h1>
                        <p>The Urban Botany database contains care instructions for over 100 of the most common houseplants, so you know how to give your plant the optimal care it deserves. Simply search either by scientific name or by common name, and if we have care info for that plant we’ll share all of our knowledge with you.</p>
                    </div>
                    {/* This is where I save the user's search input so I can pass it to my state and reiterate through my dataset to see if there's a match for a plant they searched. */}
                    <div className="searchBar">
                        <form onSubmit={this.saveUserInput}>
                            <input type="text" className="plantSearchInput" id="plantQuery" placeholder="Search for a Plant" onChange={this.getUserInput}></input>
                            <button type="submit"><i className="fas fa-search"></i></button>
                        </form>
                    </div>

                    <div className="searchResults">

                        {/* The DisplayAllPlants.js componenent relies on the state of showAllPlants to be true for it to show. It passes down the function that allows the user to click on a certain plant for more details (showThisPlantProp), states that indicate the current page and previous page, and functions that allow the user to navigate through "pages". The app only shows nine plants per page. */}
                        {this.state.showAllPlants ? <div className="displayAllPlantsContainer"><div className="searchResultsHeader"><h2>Displaying All Plants</h2></div><DisplayAllPlants plantsProp={this.props.plantsProp} showThisPlantProp={this.showThisPlant} plantsPerPageProp={this.state.plantsPerPage} currentPageProp={this.state.currentPage} previousPageProp={this.state.previousPage} totalNumberOfPagesProp={this.state.totalPages} nextPageFunction={this.nextPage} previousPageFunction={this.previousPage} greyOutArrowsFunction={this.greyOutArrows} /></div> : null}

                        {/* This block of code determines whether or not the SearchForSpecificPlant.js component should show, depending on the state of showSearchForASpecificPlant being true or false. It passes down the user's search query as a prop, the function to show a specific plant (showThisPlant()), and the ability to go back to Display All Plants. */}

                        {this.state.showSearchForASpecificPlant ? <div className="displayAllPlantsContainer"><div className="searchResultsHeader"><h2>Displaying search results for {this.state.userInput}</h2></div><SearchForSpecificPlant searchQueryProp={this.state.userInput} plantsProp={this.props.plantsProp} showThisPlantProp={this.showThisPlant} goBackToAllPlantsProp={this.goBackToAllPlants} /></div> : null}


                        {/* The following block of code allows the user to click on a specific plant and loads its data from the plants array I have as a state in App.js (which holds all my data from Firebase). It passes down all the info for that specific plant as props. */}

                        {this.state.showInfoForSpecificPlant ? <InfoForSpecificPlant specificPlantScientificNameProp={this.state.specificPlantScientificName} specificPlantCommonNameProp={this.state.specificPlantCommonName} specificPlantImageProp={this.state.specificPlantImage} specificPlantFamilyProp={this.state.specificPlantFamily} goBackToAllPlantsProp={this.goBackToAllPlants} lowLightProp={this.state.toleratesLowLight} mediumLightProp={this.state.toleratesMediumLight} highLightProp={this.state.toleratesHighLight} wateringNeedsProp={this.state.specificPlantWateringNeeds} humidityProp={this.state.specificPlantHumidity} maxGrowthProp={this.state.specificPlantMaxGrowthInMetres} propagationProp={this.state.canPropagateByCutting} toxicProp={this.state.isToxic} altProp={this.state.altTag} repottingProp={this.state.repottingNeeds} / > : null}
                    </div>

                </div>
            </React.Fragment>

        ) 
    }
};

export default PlantSearch;