import React, { Component } from 'react';
import './App.css';
import fetchJsonp from 'fetch-jsonp'
import { Grid, Container, Header } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import ArtCard from './components/ArtCard'
import SearchBar from './components/SearchBar';


class App extends Component {

  state = {
    resp: null,
    anyData: false,
    searching: false,
    searchData: '',
  }

  componentDidMount() {
    fetchJsonp('https://itunes.apple.com/search?term=deadmau5&entity=album&limit=10')
      .then((response) => {
        return response.json()
      }).then((json) => {
        this.setState({ resp: json, anyData: true})
      }).catch((ex) => {
        console.log('parsing failed', ex)
      })
  }

  componentDidUpdate() {
    if(this.state.searching === true) {
      fetchJsonp(`https://itunes.apple.com/search?term=${this.state.searchData}&entity=album&limit=10`)
      .then((response) => {
        return response.json()
      }).then((json) => {
        this.setState({ resp: json, searching: false})
      }).catch((ex) => {
        console.log('parsing failed', ex)
      })
    }
  }


  artCard = () => {
    return this.state.resp.results.map((el, index) => {
      const date = el.releaseDate.substring(0,4)
      const preImage = el['artworkUrl100']
      const image = preImage.substring(0, preImage.lastIndexOf("/") + 1) + "300x300.jpg";
      const imageHQ = preImage.substring(0, preImage.lastIndexOf("/") + 1) + "10000x10000-999.jpg";
      // console.log(el)
      return <ArtCard artistName={el.artistName}  albumName={el.collectionName}  imageHQ={imageHQ} date={date} image={image} key={image}></ArtCard>
    });
  }

  search = (str) => {
    this.setState({ searchData: encodeURIComponent(str), searching: true })
  }

  render() {
    return (
      <div className="App">
      <Container>
        <Header as='h1'>Search For iTunes Album Art!</Header>
        <SearchBar search={this.search} />
        <Grid columns={4}>
        {(this.state.anyData === true) ?
          this.artCard() :
          <div>Loading</div>
        }
        </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
