import React, { Component } from 'react';
import './sass/app.scss';
import PageNavigation from "./PageNavigation.js";

class DisplayAllPlants extends Component {

    render() {
        return(
            <React.Fragment>

                    {
                        this.props.plantsProp.map( (eachPlant, index) => {
                            let totalNumberOfPlants = this.props.plantsProp.length;
                            let currentPage = this.props.currentPageProp;
                            let previousPage = this.props.previousPageProp;
                            let plantsPerPage = this.props.plantsPerPageProp;
                            let totalPages = Math.ceil(totalNumberOfPlants / plantsPerPage);
                            console.log(totalNumberOfPlants, currentPage, plantsPerPage, totalPages);

                            if ((index + 1) <= currentPage *  this.props.plantsPerPageProp && (index + 1) > previousPage * this.props.plantsPerPageProp) {
                                return (
                                    <div key={index} className="plantContainer" onClick={ () => this.props.showThisPlantProp(eachPlant.scientificName, eachPlant.commonName, eachPlant.image, eachPlant.family, eachPlant.lowLight, eachPlant.mediumLight, eachPlant.highLight, eachPlant.wateringNeeds, eachPlant.humidity, eachPlant.maxGrowthInMetres, eachPlant.propagateByCutting, eachPlant.toxic)}>
                                        <div className="plantImageContainer">
                                            <img src={eachPlant.image} alt="" />
                                        </div>
                                        <h3>{eachPlant.scientificName}</h3>
                                        <h4>{eachPlant.commonName}</h4>
                                    </div>
                                )
                            }
                        })
                    } 

                <PageNavigation currentPageProp={this.props.currentPageProp} previousPageProp={this.props.previousPage} nextPageProp={this.props.nextPageFunction} previousPageFunction={this.props.previousPageFunction} greyOutArrowsFunction={this.props.greyOutArrowsFunction} plantsProp={this.props.plantsProp} plantsPerPage={this.props.plantsPerPageProp}>
                </PageNavigation>

            </React.Fragment>
        )
    }
}

export default DisplayAllPlants;