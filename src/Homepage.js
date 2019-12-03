import React, { Component } from 'react';
import './sass/app.scss';

class Homepage extends Component {

    sendDataToParent = () => {
        this.props.searchPlantsProp();
    }

    render() {
        // This is the default component that loads first and acts as the "homepage".
        return(
            <section className="homepageContainer">
                <div className="headerContainer">
                    <h1>Keep your houseplants happy.</h1>
                </div>
                <div className="homepageCopyText">
                    <p>Our database contains care info on over 100 of the most common houseplants. Find your plant, save it to your collection, and look up care instructions whenever.</p>
                    <button className="searchForAPlant" onClick={this.sendDataToParent}>Search for a Plant</button>
                </div>
            </section>
        );
    }
}

export default Homepage;