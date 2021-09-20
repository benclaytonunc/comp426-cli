const React = require("react");
const axios = require("axios");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prices: []
    };
  }

  componentDidMount() {
    axios
      .get("/prices")
      .then(response => {
        this.setState({ prices: response.data });
      })
      .catch(err => {
        console.log("Error fetching data from server", err);
      });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Cryptoasset Prices</h1>
        <p>
          This is a demo of the{" "}
          <a href="https://docs.nomics.com">Nomics Cryptoasset API</a>.
        </p>
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {this.state.prices.map(p => (
              <tr key={p.currency}>
                <td>{p.currency}</td>
                <td>{p.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

module.exports = App;
