import React, { Component } from 'react';
import { provider } from "./firebase.js";
import { auth } from "./firebase.js";
import './sass/app.scss';
import logo from "./assets/logo.png"
import Homepage from "./Homepage.js";
import PlantSearch from "./PlantSearch.js";
import listOfPlants from "./firebase.js";
import Footer from "./Footer";
import users from "./firebase.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      showHomepage: true,
      showPlantSearchComponent: false,
      plants: [],
      user: null,
      userId: "",
      currentUser: "",
      userName: "",
    }
  }

  login = () => {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const username = result.user;
        console.log(result);
        this.setState({
          user: username
        });
        let user = auth.currentUser;
        let uid;
        let email;
        if (user != null) {
          uid = user.uid;
          let displayName = user.displayName;
          this.setState({
            userId: uid,
            userName: displayName,
          })
          // users.child("users").child(displayName).setValue(uid);
        }
      });
  }


  logout  = () => {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null,
          userId: null,
          currentUser: null,
        });
      });
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

  getUserInfo = () => {
    const listOfUsersArray = [];
    let counter = 0;
    let listCounter = 0;
    users.on("value", (userData) => {
      const listOfUsers = userData.val();
      for (let eachUser in listOfUsers) {
        console.log(eachUser);
        listOfUsersArray.push(listOfUsers[eachUser]);
      };
      const usersObject = listOfUsersArray[1];
      console.log(usersObject);
      Object.entries(usersObject).map(([key, value]) => {
        const innerDataObject = [key, value];
        const databaseUserKey = innerDataObject[0];
        const authenticationUserId = innerDataObject[1];
        console.log(databaseUserKey, authenticationUserId);
        // this.getThisUserInfo(authenticationUserId);
        // if (authenticationUserId === this.state.userId) {
        //   console.log("This user has already been added to the database.");
        // } else {
        //   console.log(this.state.uid);
          // const currentUserId = users.child("users").push(this.state.userId);
          // console.log(`the current user id is ${currentUserId}`);
          // this.setState({
          //   currentUser: currentUserId,
          // })
        }
      )
    })
  }

  componentDidMount() {

    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
    
    // const userId = this.state.userId;
    // const dataToCheckForUser = [];
    // listOfUsers.on("value", (response) => {
    //     const firebaseData = response.val();
    //     for (let findUserId in firebaseData) {
    //       dataToCheckForUser.push(firebaseData[findUserId]);
    //     }
    //     const dataObject = dataToCheckForUser[0];
    //     Object.entries(dataObject).map(([key, value]) => {
    //       // console.log(dataObject);
    //       if (dataObject.includes(this.state.currentUserId)) {
    //         console.log("We have this user");
    //       } else {
    //         const listOfUsers.push(this.state.currentUserId);
    //       }
    //     }) 
    //   }
    // )

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
