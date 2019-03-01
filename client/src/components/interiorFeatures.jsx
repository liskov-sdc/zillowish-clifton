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

const InteriorFeatures = (props)=> {
  
   return (
     <div className="interior">

       <div className="bedrooms">
          <div style={factFeatures}>INTERIOR FEATURES</div>
          <div style={interiorFeatures}>Bedrooms</div>
            <div style={subFeatures}>Beds: {props.beds}</div>
        </div>

        <div className="heat">
          <div style={interiorFeatures}>Heating and Cooling</div>
            <div style={subFeatures}>Heating: {props.heating}</div>
            <div style={subFeatures}>Cooling: {props.cooling}</div>
        </div>

        <div className="bathroom">
          <div style={interiorFeatures}>Bathrooms</div>
          <div style={subFeatures}>Baths: {props.baths}</div>
        </div>  

        <div className="appliances">
          <div style={interiorFeatures}>Appliances</div>
          <div style={subFeatures}>Appliances included:</div>
            <div>{props.appliances} </div>
        </div>

          <div className="kitchen">
            <div style={interiorFeatures}>Kitchen</div>
            <div style={subFeatures}>KITCHEN FEATURES:</div>
                {props.kitchen}
          </div>

        <div className="flooring">
          <div style={interiorFeatures}>Flooring</div>
          <div style={subFeatures}>Floor Size: {props.flooring}</div>
        </div>

     </div>
   )
 } 

export default InteriorFeatures