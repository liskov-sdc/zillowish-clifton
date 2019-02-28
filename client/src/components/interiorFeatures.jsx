import React from "react";
import axios from 'axios';

const factFeatures = {
  fontSize: '15px',
  lineHeight: "1.5",
  fontWeight: "700",
  textTransform: "uppercase",
  color: "#444",
  borderTop: "1px solid #eee",
  paddingTop: "15px",
  marginBottom: "10px",
};

const interiorFeatures = {
  fontSize: '15px',
  fontWeight: "700",
  color: "#444",
  marginBottom: "5px",
};

const subFeatures = {
  fontSize: '15px',
  color: "#aaa",
  marginBottom: "10px",
  marginTop: "10px"
};

class InteriorFeatures extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
       beds: 3,
       heating: "yes",
       cooling: "yes",
       baths: 3,
       kitchen: "Eatin",
       appliances: "Dishwasher",
       flooring: 1900
    };
  }

  componentDidMount() {
    axios(`http://localhost:3003/house/interior/3`)
    .then(response => {
      let house = response.data[0];
      console.log(house);
        this.setState({
          beds: house.bedrooms,
          heating: house.heating_cooling,
          cooling: house.heating,
          baths: house.bathrooms,
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
     <div className="interior">
       
       <div style={factFeatures}>INTERIOR FEATURES</div>
        <div style={interiorFeatures}>Bedrooms</div>
          <div style={subFeatures}>Beds: {this.state.beds}</div>

        <div className="heat">
          <div style={interiorFeatures}>Heating and Cooling</div>
            <div style={subFeatures}>Heating: {this.state.heating}</div>
            <div style={subFeatures}>Cooling: {this.state.cooling}</div>
        </div>

        <div style={interiorFeatures}>Bathrooms</div>
          <div style={subFeatures}>Baths: {this.state.baths}</div>

        <div style={interiorFeatures}>Appliances</div>
        <div style={subFeatures}>Appliances included:</div>
           <div>{this.state.appliances} </div>

        <div style={interiorFeatures}>Kitchen</div>
          <div style={subFeatures}>KITCHEN FEATURES:</div>
            {this.state.kitchen}
          
        <div style={interiorFeatures}>Flooring</div>
          <div style={subFeatures}>Floor Size: {this.state.flooring}</div>
       
     </div>
   )
 } 

}

export default InteriorFeatures