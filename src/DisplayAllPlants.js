import React, { Component } from 'react';
import './sass/app.scss';
import storage from "./firebase.js";


class DisplayAllPlants extends Component {

    render() {
        // console.log(this.props.plantsProp);

        return(
            <React.Fragment>

                    {
                        this.props.plantsProp.map( (eachPlant, index) => {
                            return (
                                <div key={index} className="plantContainer" onClick={ () => this.props.showThisPlantProp(eachPlant.scientificName, eachPlant.commonName, eachPlant.image, eachPlant.family, eachPlant.lowLight, eachPlant.mediumLight, eachPlant.highLight, eachPlant.wateringNeeds, eachPlant.humidity, eachPlant.maxGrowthInMetres, eachPlant.propagateByCutting, eachPlant.toxic)}>
                                    <div className="plantImageContainer">
                                        <img src={eachPlant.image} alt="" />
                                    </div>
                                    <h3>{eachPlant.scientificName}</h3>
                                    <h4>{eachPlant.commonName}</h4>
                                </div>
                            )
                        })
                    } 

            </React.Fragment>
        )
    }
}

export default DisplayAllPlants;