import { Card } from 'semantic-ui-react'
import React, { Component } from 'react'

class ArtCard extends Component {
  render(){
    return(
      <div>
        <Card>
          <Card.Content>
            <a href={this.props.imageHQ} rel="noopener noreferrer"  target='_blank'>
              <img className='album-image' src={this.props.image} alt={this.props.albumName} />
            </a>
            <Card.Header>{this.props.artistName}</Card.Header>
            <Card.Meta>{this.props.albumName}</Card.Meta>
            <Card.Description>{this.props.date}</Card.Description>
          </Card.Content>
        </Card>
      </div>
    )
  }
}

export default ArtCard