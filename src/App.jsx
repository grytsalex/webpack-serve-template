import React from "react";
import Helmet from "react-helmet";

class App extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <link rel="icon" type="image/png" href="%PUBLIC_URL%/favicon.ico"/>
        </Helmet>
      </div>
    );
  }
}

export default App;
