import React from 'react';
import ReactDOM from 'react-dom';
import Facts from './facts.jsx';

import Facts_Features from './factsFeatures.jsx';
import { library } from '@fortawesome/fontawesome-svg-core'
//import { fab } from '@fortawesome/free-brands-svg-icons'
import { faHome, faSnowflake, faCalendar, faThermometerHalf, faParking, faThLarge} from '@fortawesome/free-solid-svg-icons'
import InteriorFeatures from './interiorFeatures.jsx';
 
library.add( faHome, faSnowflake, faCalendar, faThermometerHalf, faParking, faThLarge)

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Facts/>
        <Facts_Features />
        <div className="interiorFeatures">
          <InteriorFeatures />

        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))