import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components'
import './styleCSS/facts.css';
import $ from 'jquery'
import axios from 'axios'


const factLabel = {
  fontSize: "15px",
  lineHeight: "1.5",
  fontWeight: "700",
  color: "#444",
  marginBottom: '0'
};

const Type = styled.section`
    position: absolute;
    left: 10px;  
    width: 200px;
    top: 83px;
    height: 10px;
`;

const HouseIcon = styled.section `
  display: inline-block
  position: absolute;
  left: 10px;  
  width: 200px;
  top: 5x;
  height: 10px;
  padding: 10px;
`

const YearBuilt = styled.section`
    display: inline-block
    position: absolute;
    left: 135px;  
    width: 200px;
    top: 83px;
    height: 10px;
`;

const Heating = styled.section`
    position: absolute;
    left: 250px;  
    width: 200px;
    top: 68px;
    height: 10px;
`;

const Cooling = styled.section`
    position: absolute;
    left: 10px;  
    width: 200px;
    top: 142px;
    height: 10px;
`;

const Parking = styled.section`
    position: absolute;
    left: 135px;  
    width: 200px;
    top: 125px;
    height: 10px;
`;

const Lot = styled.section`
    position: absolute;
    left: 250px;  
    width: 200px;
    top: 125px;
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
          yearBuilt: house.year_built,
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

        <Type>
          <HouseIcon>
            <FontAwesomeIcon icon="home" />
          </HouseIcon>

          <span style={factLabel}>Type</span> <br></br>
          {this.state.type}
        </Type>
    
        <YearBuilt>
          <div className ="yearbuilt">
            <span style={factLabel}>Year Built</span> <br></br>
            <FontAwesomeIcon icon= "calendar" />
            {this.state.yearBuilt}
          </div>
        </YearBuilt>

        <Heating>
          <div>
            <p style={factLabel}>Heating</p>
              <FontAwesomeIcon icon="thermometer-half" />
            {this.state.heating}
          </div>
        </Heating>

        <Cooling>
          <div>
            <span style={factLabel}>Cooling</span> <br></br>
            <FontAwesomeIcon icon="snowflake" />
            {this.state.cooling}
          </div>
        </Cooling>

        <Parking>
          <div>
            <p style={factLabel}>Parking</p>
            <FontAwesomeIcon icon="parking" />
            {this.state.parking}
          </div>
        </Parking>

        <Lot>
          <div>
            <p style={factLabel}>Lot</p>
            <FontAwesomeIcon icon="th-large" />
            {this.state.lot}
          </div>
        </Lot>
     
      </div>
    )
  }
}

export default Facts_Features