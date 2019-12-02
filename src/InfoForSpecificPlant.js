import React, { Component } from 'react';
import './sass/app.scss';
import sunIcon from "./assets/sunIcon.svg";
import waterIcon from "./assets/waterIcon.svg";
import growthIcon from "./assets/growthIcon.svg";
import repottingIcon from "./assets/repottingIcon.svg";
import propagateByCuttingIcon from "./assets/propagateByCuttingIcon.svg";
import toxicIcon from "./assets/toxicIcon.svg";

class InfoForSpecificPlant extends Component {
    render() {
        return(
            <React.Fragment>
                <h2 className="goBackToAllPlants" onClick={this.props.goBackToAllPlantsProp}>Go Back To All Plants</h2>
                    <div className="plantInfoContainer">
                        <div className="plantInfoImageContainer">
                            <img src={this.props.specificPlantImageProp} alt="" />
                        </div>
                        <div className="plantInfoText">
                            <h3>{this.props.specificPlantScientificNameProp}</h3>
                            <h4>{this.props.specificPlantCommonNameProp}</h4>
                            <p>Family: {this.props.specificPlantFamilyProp}</p>
                            <div className="infoGrid">
                                <div className="plantInfo">
                                    <div className="infoImage"><img src={sunIcon} alt="" /></div>
                                    <span className="dataTitle">Light Toleration</span>
                                    {this.props.lowLightProp ? <span className="dataText">Low Light</span> : null}
                                    {this.props.mediumLightProp ? <span className="dataText">Medium Light</span> : null}
                                    {this.props.highLightProp ? <span className="dataText">High Light</span> : null}
                                </div>
                                <div className="plantInfo">
                                    <div className="infoImage"><img src={waterIcon} alt="" /></div>
                                    <span className="dataTitle">Watering Frequency</span>
                                    {this.props.wateringNeedsProp.includes("low") ? <span className="dataText">Every couple weeks</span> : null}
                                    {this.props.wateringNeedsProp.includes("medium") ? <span className="dataText">Once a week</span> : null}
                                    {this.props.wateringNeedsProp.includes("high") ? <span className="dataText">Every five days</span> : null}
                                </div>
                                <div className="plantInfo">
                                    <div className="infoImage"><img src={growthIcon} alt="" /></div>
                                    <span className="dataTitle">Max Growth</span>
                                    {this.props.maxGrowthProp === 1 ? <span class="dataText">{this.props.maxGrowthProp} metre</span> : <span class="dataText">{this.props.maxGrowthProp} metres</span>}
                                </div>
                                <div className="plantInfo">
                                    <div className="infoImage"><img src={repottingIcon} alt="" /></div>
                                    <span className="dataTitle">Repotting</span>
                                    {/* {this.props.maxGrowthProp === 1 ? <span class="dataText">{this.props.maxGrowthProp} metre</span> : <span class="dataText">{this.props.maxGrowthProp} metres</span>} */}
                                </div>
                                <div className="plantInfo">
                                    <div className="infoImage"><img src={propagateByCuttingIcon} alt="" /></div>
                                    <span className="dataTitle">Propagation</span>
                                    {this.props.propagationProp ? <span class="dataText">Propagate by cutting</span> : <span class="dataText">Cannot be propagated by cutting</span>}
                                </div>
                                <div className="plantInfo">
                                    <div className="infoImage"><img src={toxicIcon} alt="" /></div>
                                    <span className="dataTitle">Toxicity</span>
                                    {this.props.toxicProp ? <span class="dataText">Toxic for pets</span> : <span class="dataText">Safe for pets</span>}
                                </div>
                            </div>
                        </div>
                    </div>
            </React.Fragment>
        )
    }
}

export default InfoForSpecificPlant;