import React from "react";
import axios from 'axios';
import styled from 'styled-components'

const factFeatures = {
  fontSize: "20px",
  lineHeight: "1.5",
  fontWeight: "700",
  color: "#444",
};
const Interior = styled.section `

`

class InteriorFeatures extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
       beds: 3,
       heating: "yes",
       cooling: "yes",
       baths: 3,
       kitchen: "forest",
       appliances: "hello",
       flooring: "yes"
    };
  }

 render() {
   return (
     <div>
       <div style={factFeatures}>INTERIOR FEATURES</div>

     </div>
   )
 } 

}

export default InteriorFeatures