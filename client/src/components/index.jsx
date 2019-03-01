import React from 'react';
import ReactDOM from 'react-dom';
import Facts from './facts.jsx';
import axios from 'axios'
import Facts_Features from './factsFeatures.jsx';
import { library } from '@fortawesome/fontawesome-svg-core'
//import { fab } from '@fortawesome/free-brands-svg-icons'
import { faHome, faSnowflake, faCalendar, faThermometerHalf, faParking, faThLarge} from '@fortawesome/free-solid-svg-icons'
import InteriorFeatures from './interiorFeatures.jsx';
 
library.add( faHome, faSnowflake, faCalendar, faThermometerHalf, faParking, faThLarge)

class App extends React.Component {
  constructor(props) {
    super(props);

      this.state = {
        type:"1",
        yearBuilt: 0,
        factsHeating: "1",
        factsCooling: "1",
        parking: "1",
        lot: '89',
        //interior
        beds: 0,
        heating: "",
        cooling: "",
        baths: 0,
        kitchen: "",
        appliances: "",
        flooring: ""
    };
  }

  componentDidMount() {
    var path = window.location.pathname.split('/');
    console.log("facts path",path);
    let id = path[1];
    axios(`http://localhost:3003/house/${id}`)
    .then(response => {
      let house = response.data[0];
      console.log("house", house);
        this.setState({
          type: house.type,
          yearBuilt: house.year_built,
          factsHeating: house.heating,
          factsCooling: house.cooling,
          parking: house.parking,
          lot: house.lot
        });
      })
      .catch( error => {
        console.log(error);
      });

    axios(`http://localhost:3003/house/interior/${id}`)
      .then(response => {
        let house = response.data[0];
         console.log("interior data", house);
          this.setState({
            beds: house.bedrooms,
            baths: house.bathrooms,
            heating: house.interiorheating,
            cooling: house.interiorcooling,
            kitchen: house.kitchen,
            appliances: house.appliances,
            flooring: house.flooring +' sqft'
          });
        })
        .catch( error => {
          console.log(error);
        });

  }
  render() {
    return (
      <div>
        <Facts/>
        <Facts_Features type={this.state.type} yearBuilt={this.state.yearBuilt} factsCooling={this.state.factsCooling} 
            factsHeating={this.state.factsHeating} parking={this.state.parking} lot={this.state.lot}/>
        <div className="interiorFeatures">
        <InteriorFeatures beds={this.state.beds} heating={this.state.heating} cooling={this.state.cooling} baths={this.state.baths} 
            kitchen={this.state.kitchen} appliances={this.state.appliances} flooring={this.state.flooring}
          />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('facts'))