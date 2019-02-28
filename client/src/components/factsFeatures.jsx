import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components'
import $ from 'jquery'
import axios from 'axios'


const factLabel = {
  fontSize: "15px",
  lineHeight: "1.5",
  fontWeight: "700",
  color: "#444",
  marginBottom: '0'
};

const HouseIcon = styled.section `
  position: absolute;
  left: -55px;  
  width: 200px;
  top: 8px;
  height: 10px;
`;

const YearIcon = styled.section`
  display: inline-block
  position: absolute;
  left: -35px;  
  width: 200px;
  top: 8px;
  height: 10px;
`;

const CoolingIcon = styled.section`
  position: absolute;
  left: -50px;  
  width: 200px;
  top: 8px;
  height: 10px;
`;

const LotIcon = styled.section`
  position: absolute;
  left: -35px;  
  width: auto;
  top: 20px;
  height: 10px;
  display: inline-block;
`;

const HeatingIcon = styled.section`
  position: absolute;
  left: -100px;  
  width: 200px;
  top: 8px;
  height: 10px;
`;

const ParkingIcon = styled.section`
    position: absolute;
    left: -100px;  
    width: 200px;
    top: 8px;
    height: 10px;
    
`;



class Facts_Features extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type:"Single Family",
      yearBuilt: 2003,
      heating: "Forced Air",
      cooling: "None",
      parking: "1 Space",
      lot: "2342"
    };

  }

  componentDidMount() {
    axios(`http://localhost:3003/house/3`)
    .then(response => {
      let house = response.data[0];
      console.log(house);
        this.setState({
          type: house.type,
          yearBuilt: "2003",
          heating: house.heating,
          cooling: house.cooling,
          parking: house.parking,
          lot: house.lot
        });
      })
      .catch( error => {
        console.log(error);
      });
  }

  render() {
    return (
     
      <div className="facts">
        <div className="type">
          <HouseIcon> <FontAwesomeIcon icon="home" size="2x"/> </HouseIcon>
          <span style={factLabel}>Type</span> <br></br>
          {this.state.type}
        </div>
     
          <div className ="yearbuilt">
            <div style={factLabel}>Year Built</div> 
            <YearIcon> <FontAwesomeIcon icon= "calendar" size="2x"/> </YearIcon>
            {this.state.yearBuilt}
          </div>
    
          <div className="heating">
            <div style={factLabel}>Heating</div>
              <HeatingIcon> <FontAwesomeIcon icon="thermometer-half" size="2x" /> </HeatingIcon>
              {this.state.heating}
          </div>
         
          <div className="cooling">
            <span style={factLabel}>Cooling</span> <br></br>
              <CoolingIcon> <FontAwesomeIcon icon="snowflake" size="2x"/> </CoolingIcon>
              {this.state.cooling}
          </div>
     
          <div className="parking">
            <div style={factLabel}>Parking</div>
              <ParkingIcon> <FontAwesomeIcon icon="parking" size="2x"/> </ParkingIcon>
                {this.state.parking}
          </div>
        
          <div className="lot">
            <p style={factLabel}>Lot</p>
              <LotIcon> <FontAwesomeIcon icon="th-large" size="2x" /> </LotIcon>
              {this.state.lot}
          </div>
      </div>
    )
  }
}

export default Facts_Features