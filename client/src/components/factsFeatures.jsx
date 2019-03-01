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



const Facts_Features = (props) => {

    return (
      <div className="facts">
        <div className="type">
          <HouseIcon> <FontAwesomeIcon icon="home" size="2x"/> </HouseIcon>
          <span style={factLabel}>Type</span> <br></br>
          {props.type}
        </div>
     
          <div className ="yearbuilt">
            <div style={factLabel}>Year Built</div> 
            <YearIcon> <FontAwesomeIcon icon= "calendar" size="2x"/> </YearIcon>
            {props.yearBuilt}
          </div>
    
          <div className="heating">
            <div style={factLabel}>Heating</div>
              <HeatingIcon> <FontAwesomeIcon icon="thermometer-half" size="2x" /> </HeatingIcon>
              {props.factsHeating}
          </div>
         
          <div className="cooling">
            <span style={factLabel}>Cooling</span> <br></br>
              <CoolingIcon> <FontAwesomeIcon icon="snowflake" size="2x"/> </CoolingIcon>
              {props.factsCooling}
          </div>
     
          <div className="parking">
            <div style={factLabel}>Parking</div>
              <ParkingIcon> <FontAwesomeIcon icon="parking" size="2x"/> </ParkingIcon>
                {props.parking}
          </div>
        
          <div className="lot">
            <p style={factLabel}>Lot</p>
              <LotIcon> <FontAwesomeIcon icon="th-large" size="2x" /> </LotIcon>
              {props.lot}
          </div>
      </div>
    )
  }


export default Facts_Features