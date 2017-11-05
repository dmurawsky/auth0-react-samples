import React, { Component } from "react";
import ReactDOM from "react-dom";
import auth0 from "auth0-js";

class App extends Component {
  constructor(props, cxt) {
    super(props, cxt);
    this.componentDidMount = this.componentDidMount.bind(this);
    this._login = this._login.bind(this);
    const auth = new auth0.WebAuth({
      domain: "beamf.auth0.com",
      clientID: "Midgah5NN7Uvt0zkAkocWFMUGOSwHcnO",
      redirectUri: "http://localhost:3000",
      audience: "https://beamf.auth0.com/userinfo",
      responseType: "token id_token",
      scope: "openid"
    });
    this.state = {
      searches: [],
      auth
    };
  }

  componentDidMount() {
    this.setState(() => ({
      searches: location.hash
        .substring(1)
        .split("&")
        .map(s => s.split("="))
    }));
  }

  _login() {
    this.state.auth.authorize();
  }

  render() {
    return (
      <div style={{ margin: 80 }}>
        <button onClick={this._login}>AUTH</button>
        <hr />
        {this.state.searches.map(s => (
          <div key={JSON.stringify(s)}>
            <p style={{ wordBreak: "break-all" }}>
              <strong>{s[0]}</strong>
              <br />
              {s[1]}
            </p>
          </div>
        ))}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
