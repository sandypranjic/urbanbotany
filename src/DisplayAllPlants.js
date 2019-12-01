import React, { Component } from 'react';
import './sass/app.scss';
import storage from "./firebase.js";


class DisplayAllPlants extends Component {

    render() {
        // console.log(this.props.plantsProp);

        return(
            <React.Fragment>
                <h2>Displaying All Plants</h2>

                <div className="displayAllPlantsContainer">

                    {
                        this.props.plantsProp.map( (eachPlant, index) => {
                            return (
                                <div key={index} className="plantContainer">
                                    <div className="plantImageContainer">
                                        <img src={eachPlant.image} alt="" />
                                    </div>
                                    <h3>{eachPlant.scientificName}</h3>
                                    <h4>{eachPlant.commonName}</h4>
                                </div>
                            )
                        })
                    } 

                </div>


            </React.Fragment>
        )
    }
}

export default DisplayAllPlants;