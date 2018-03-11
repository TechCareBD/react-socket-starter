import React, {Component} from 'react';
import Settings from '../../config/Settings';

import Counter from '../Counter';


class Landing extends Component {

	componentDidMount() {
    document.title = Settings.title;
  }

  render() {
    return (
      <div className="content landing-content">
        <br />
        <h1>Hello World!</h1>
        <p>This counter below is ticking on the server (see [/src/server/server.js]).</p>
        <Counter />
        <p>(try opening another browser window and see what happens)</p>
        <hr />
        <br />
        <p>Take a look at [/src/client/components/pages/Landing.jsx] and [/src/client/components/Counter.jsp] to see what's going on here.</p>
        <hr />
        <h5>Happy Hacking!</h5>
      </div>
    )
  }
};

export default Landing;
