import React, { Component } from "react";
import './sass/app.scss';

class SearchForSpecificPlant extends Component {
    constructor() {
        super();
        this.state = {
            plantsWithMatch: 0,
        }
    }

    // noSearchQueryMatch = () => {
    //     if (plantsWithMatch === 0) {
    //         document.getElementsByClassName("displayAllPlantsContainer").innerHtml = "";
    //         return(
    //             <div className="plantContainer" key="index">
    //                 <h3>We don't have any info on the plant you searched. Please try again.</h3>
    //             </div>
    //         )
    //     }
    // }

    render() {
        let counter = 0;
                return(
                <React.Fragment>
                    {
                        this.props.plantsProp.map( (plant, index) => {
                            const lengthOfArray = this.props.plantsProp.length;
                            const searchQuery = this.props.searchQueryProp;
                            const plantCommonName = plant.commonName.toLowerCase();
                            const plantScientificName = plant.scientificName.toLowerCase();
                            if (plantCommonName.includes(searchQuery) === true || plantScientificName.includes(searchQuery) === true || plant.commonName.includes(searchQuery) === true || plant.scientificName.includes(searchQuery) === true) {
                                counter = counter + 1;
                                console.log("We found a match");
                                counter = counter + 1;
                                console.log(counter);
                                return(
                                    <div key={index} className="plantContainer">
                                        <div className="plantImageContainer">
                                            <img src={plant.image} alt="" />
                                        </div>
                                        <h3>{plant.scientificName}</h3>
                                        <h4>{plant.commonName}</h4>
                                    </div>
                                );
                            };
                            if (lengthOfArray === index + 1 && counter === 0) {
                                return(
                                    <h3>Our database does not have any info on the plant you searched. Please try again. You might get more accurate results if you search using the plant's scientific name.</h3>
                                )
                            }
                        })
                    }
                </React.Fragment>
            )
        }
    }

export default SearchForSpecificPlant;