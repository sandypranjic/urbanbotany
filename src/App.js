import React, { Component } from 'react';
import './sass/app.scss';
import logo from "./assets/logo.png"
import Homepage from "./Homepage.js";
import PlantSearch from "./PlantSearch.js";
import listOfPlants from "./firebase.js";
import Footer from "./Footer";


// Which components show depend on how different states are set
// The plants array in my constructor holds all the plant data that I load from Firebase

class App extends Component {
  constructor() {
    super();
    this.state = {
      showHomepage: true,
      showPlantSearchComponent: false,
      plants: [],
    }
  }

  showPlantSearchComponent = () => {
    this.setState({
      showPlantSearchComponent: true,
      showHomepage: false,
    });
  }

  showHomepageComponent = () => {
    this.setState({
      showPlantSearchComponent: false,
      showHomepage: true,
    });
  }

  componentDidMount() {

    // The following event listener listens to my database for any change and pushes each object from my database into my plants array in the state, which allows me to utilize said data and loop through it.

    const listOfPlantsArray = [];
    const plantData = [];
    listOfPlants.on("value", (response) => {
        const plantItem = response.val();
        for (let individualPlant in plantItem) {
            listOfPlantsArray.push(plantItem[individualPlant]);
        }
        const plantsObject = listOfPlantsArray[0];
        Object.entries(plantsObject).map(([key, value]) => {
          const innerPlantObject = [key, value];
          const plant = innerPlantObject[1];

          plantData.push({scientificName: plant.scientificName, commonName: plant.commonName, family: plant.family, toxic: plant.toxic, wateringNeeds: plant.wateringNeeds, humidity: plant.humidity, lowLight: plant.lowLight, mediumLight: plant.mediumLight, highLight: plant.highLight, propagateByCutting: plant.propagateByCutting, maxGrowthInMetres: plant.maxGrowthInMetres, image: plant.image, alt: plant.alt, repotting: plant.repotting});

          this.setState({
            plants: plantData
          })
        })
      })
  }



  render() {
    return (
      <React.Fragment>
        <header className="wrapper">
          <div className="logoContainer">
            <img src={logo} alt="" onClick={this.showHomepageComponent}></img>
          </div>
          <nav className="topNav">
            <ul>
              <li onClick={this.showPlantSearchComponent}>Search Plants</li>
            </ul>
          </nav>
        </header>
        <main className="wrapper">
          {this.state.showHomepage ? <Homepage searchPlantsProp={this.showPlantSearchComponent} /> : null}
          {this.state.showPlantSearchComponent ? <PlantSearch plantsProp={this.state.plants} /> : null}
        </main>

        {this.state.showHomepage ? null : <Footer />}

      </React.Fragment>
    );
  }
}

export default App;
