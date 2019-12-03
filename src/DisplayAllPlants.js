import React, { Component } from 'react';
import './sass/app.scss';
import PageNavigation from "./PageNavigation.js";

class DisplayAllPlants extends Component {

    render() {
        return(
            <React.Fragment>

                    {/* This block of code goes through my plants state array that I set in App.js, and shows 9 plants per page depending on their index. Each div holds an onClick, where if the user clicks on the plant then it calls the showThisPlant() function from PlantSearch.js, and passes in the plant's care instructions as parameters. */}
                    {
                        this.props.plantsProp.map( (eachPlant, index) => {
                            let totalNumberOfPlants = this.props.plantsProp.length;
                            let currentPage = this.props.currentPageProp;
                            let previousPage = this.props.previousPageProp;
                            let plantsPerPage = this.props.plantsPerPageProp;
                            let totalPages = Math.ceil(totalNumberOfPlants / plantsPerPage);

                            if ((index + 1) <= currentPage * this.props.plantsPerPageProp && (index + 1) > previousPage * this.props.plantsPerPageProp) {
                                return (
                                    <div key={index} className="plantContainer" onClick={ () => this.props.showThisPlantProp(eachPlant.scientificName, eachPlant.commonName, eachPlant.image, eachPlant.family, eachPlant.lowLight, eachPlant.mediumLight, eachPlant.highLight, eachPlant.wateringNeeds, eachPlant.humidity, eachPlant.maxGrowthInMetres, eachPlant.propagateByCutting, eachPlant.toxic, eachPlant.alt, eachPlant.repotting)}>
                                        <div className="plantImageContainer">
                                            <img src={eachPlant.image} alt={eachPlant.alt} />
                                        </div>
                                        <h3>{eachPlant.scientificName}</h3>
                                        <h4>{eachPlant.commonName}</h4>
                                    </div>
                                )
                            }
                        })
                    } 

                {/* This block of code loads the PageNavigation.js component, which allows the user to go back and forward a page depending on how many plants there are total in the array, how many plants to show per page (default set at 9), and which index the plant has in the array. When the user clicks on the arrows, it triggers the functions from PlantSearch.js that increment or decrease the page number state. */}
                <PageNavigation currentPageProp={this.props.currentPageProp} previousPageProp={this.props.previousPage} nextPageProp={this.props.nextPageFunction} previousPageFunction={this.props.previousPageFunction} greyOutArrowsFunction={this.props.greyOutArrowsFunction} plantsProp={this.props.plantsProp} plantsPerPage={this.props.plantsPerPageProp}>
                </PageNavigation>

            </React.Fragment>
        )
    }
}

export default DisplayAllPlants;