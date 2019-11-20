import React from 'react';
import axios from 'axios';
import Features from './Features.jsx'
import AboutBody from './AboutBody.jsx'
import styles from '../../../public/style.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: window.location.pathname.split('/')[1],
      featureData: [],
      aboutHeader: '',
      aboutBody: '',
      features: '',
      featureTitle: ''
    };

  }
  componentDidMount() {
    this.getAboutThisGameFeaturesData();
  }

  // getGameData using axios get
  getAboutThisGameFeaturesData() {
    axios.get(`/api/features/${this.state.gameId}`)
      .then((res) => {
        // handle data
        this.setState({
          featureData: res.data,
          aboutHeader: res.data[0].aboutHeader,
          aboutBody: res.data[0].aboutBody,
          features: res.data[0].features,
          featureTitle: res.data[0].featureTitle
        })
      })
      .catch((err) => {
        console.error('error in get request in client', err);
      })
    }

  render() {
    return (
      <div className = {styles.container}>
        <AboutBody aboutBody = {this.state.aboutBody} aboutHeader= {this.state.aboutHeader}/>
        <Features features = {this.state.featureData} />
      </div>
    );
  }
}

export default App;
