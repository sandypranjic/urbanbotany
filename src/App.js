import React, { Component } from 'react';
import './sass/app.scss';
import logo from "./assets/logo.png"
import Homepage from "./Homepage.js";
import PlantSearch from "./PlantSearch.js";
import listOfPlants from "./firebase.js";
import Footer from "./Footer";

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
    // console.log(`Plant Search Component: ${this.state.showPlantSearchComponent}`);
  }

  showHomepageComponent = () => {
    this.setState({
      showPlantSearchComponent: false,
      showHomepage: true,
    });
    // console.log(`Homepage Component: ${this.state.showPlantSearchComponent}`);
  }

  plantSearchButton = () => {
    // console.log("data is sending back from child");
  }

  componentDidMount() {
    const listOfPlantsArray = [];
    const plantData = [];
    listOfPlants.on("value", (response) => {
        const plantItem = response.val();
        for (let individualPlant in plantItem) {
            listOfPlantsArray.push(plantItem[individualPlant]);
        }
        const plantsObject = listOfPlantsArray[0];
        // console.log(plantsObject);
        Object.entries(plantsObject).map(([key, value]) => {
          const innerPlantObject = [key, value];
          const plant = innerPlantObject[1];

          // console.log(`Common Name: ${plant.commonName}, Scientific Name: ${plant.scientificName}, Family: ${plant.family}`);

          plantData.push({scientificName: plant.scientificName, commonName: plant.commonName, family: plant.family, toxic: plant.toxic, wateringNeeds: plant.wateringNeeds, humidity: plant.humidity, lowLight: plant.lowLight, mediumLight: plant.mediumLight, highLight: plant.highLight, propagateByCutting: plant.propagateByCutting, maxGrowthInMetres: plant.maxGrowthInMetres, image: plant.image});

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
              <li>My Collection</li>
              <li>Login</li>
              <li>Create Account</li>
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
