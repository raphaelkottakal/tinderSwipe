import React, { Component } from 'react';
import { TimelineLite } from 'gsap';
import './App.css';

const fetchedCards = [
  {
    image: 'http://via.placeholder.com/350/efb78f/ffffff',
    celeb: 'Name Here',
    details: 'Nunc placerat massa ac molestie accumsan. Maecenas lacus ante, posuere et ipsum mollis, ornare pretium est.',
    likes: 3,
    dislikes: 5
  },
  {
    image: 'http://via.placeholder.com/350/efb78f/ffffff',
    celeb: 'Name Here',
    details: 'Nunc placerat massa ac molestie accumsan. Maecenas lacus ante, posuere et ipsum mollis, ornare pretium est.',
    likes: 3,
    dislikes: 5
  },
  {
    image: 'http://via.placeholder.com/350/efb78f/ffffff',
    celeb: 'Name Here',
    details: 'Nunc placerat massa ac molestie accumsan. Maecenas lacus ante, posuere et ipsum mollis, ornare pretium est.',
    likes: 3,
    dislikes: 5
  },
  {
    image: 'http://via.placeholder.com/350/efb78f/ffffff',
    celeb: 'Name Here',
    details: 'Nunc placerat massa ac molestie accumsan. Maecenas lacus ante, posuere et ipsum mollis, ornare pretium est.',
    likes: 3,
    dislikes: 5
  },
  {
    image: 'http://via.placeholder.com/350/efb78f/ffffff',
    celeb: 'Name Here',
    details: 'Nunc placerat massa ac molestie accumsan. Maecenas lacus ante, posuere et ipsum mollis, ornare pretium est.',
    likes: 3,
    dislikes: 5
  },
];

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    }
    this.swipeIt = this.swipeIt.bind(this);
    this.selectIt = this.selectIt.bind(this);
    this.endIt = this.endIt.bind(this);
  }

  componentDidMount() {
    console.log('Mounted');
    this.featchCards();
  }

  featchCards() {
    this.setState({
      cards: fetchedCards
    });
  }

  renderCards() {
    const css = {
      card: {
        width: '80%',
        height: 'auto',
        position: 'absolute',
        backgroundColor: 'hsl(0, 0%, 100%)',
        boxShadow: '4px 4px 8px 0px rgba(0,0,0,0.1)'
      },
      content: {
        pointerEvents: 'none',
        padding: 8
      },
      image: {
        minWidht: 256,
        minHeight: 256,
        width: '100%',
        height: 'auto',
        pointerEvents: 'none',
      },
      title: {
        pointerEvents: 'none',
        paddingBottom: 4,
        fontSize: 18
      },
      details: {
        pointerEvents: 'none',
        fontSize: 14,
        paddingBottom: 4,
        textAlign: 'justify'
      },
      meta: {
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    }
    const cards = this.state.cards.map((card, i) => {
      return (
        <div
          key={i}
          data-key={i}
          style={css.card}
          onTouchStart={this.selectIt}
          onTouchMove={this.swipeIt}
          onTouchEnd={this.endIt}
          onTouchCancel={this.endIt}
        >
          <img style={css.image} src={card.image} alt={card.celeb} />
          <div style={css.content}>
            <div style={css.title}>
              {card.celeb}
            </div>
            <div style={css.details}>
              {card.details}
            </div>
            <div style={css.meta}>
              <div>
                {card.dislikes} &otimes;
              </div>
              <div>
                {card.likes} &hearts;
              </div>
            </div>
          </div>
        </div>
      );
    });
    return cards;
  }

  removeCard(key) {
    const cards = this.state.cards.slice();
    cards.splice(key, 1);
    this.setState({
      cards
    });
    if (cards.length === 0) {
      this.featchCards();
    }
  }

  likeIt(key) {
    console.log('Like it', key);
    this.removeCard(key);
  }

  dislikeIt(key) {
    console.log('dislike it', key);
    this.removeCard(key);
  }

  endIt(e) {
    if (this.xDiff < 0) {
      if (this.xDiff < -150) {
        this.dislikeAnim.play();
      } else {
        this.dislikeAnim.reverse();
      }
    } else {
      if (this.xDiff > 150) {
        this.likeAnim.play();
      } else {
        this.likeAnim.reverse();
      }
    }
    this.xDiff = 0;
  }

  selectIt(e) {
    const { pageX } = e.touches[0];
    this.likeAnim = new TimelineLite({paused: true, onComplete: this.likeIt.bind(this, e.target.dataset.key)});
    this.dislikeAnim = new TimelineLite({paused: true, onComplete: this.dislikeIt.bind(this, e.target.dataset.key)});
    // this.currentCard.from(e.target, 10, { rotation: -90, transformOrigin:"50% 300%", autoAlpha: 0 });
    this.likeAnim.to(e.target, 2, { rotation: 90, transformOrigin:"50% 300%", autoAlpha: 0 });
    this.dislikeAnim.to(e.target, 2, { rotation: -90, transformOrigin:"50% 300%", autoAlpha: 0 });
    this.startX = pageX;
  }

  swipeIt(e) {
    const { pageX } = e.touches[0];
    this.xDiff = pageX - this.startX;
    // const { pageX, pageY } = e.touches[0];
    // const { offsetLeft, offsetTop } = e.target;
    // const x = pageX - offsetLeft;
    // const y = pageY - offsetTop;
    let seekTime = this.xDiff * 0.0005;
    if (this.xDiff < 0) {
      seekTime *= -1;
      this.dislikeAnim.seek(seekTime);
    } else {
      this.likeAnim.seek(seekTime);
    }
    
    // TweenLite.to(e.target, 4, { rotation: "+=90", transformOrigin:"50% 300%", autoAlpha: 0 });
  }

  render() {
    const css = {
      container: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      table: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'hsl(0, 0%, 90%)',
        flexGrow: 7
      },
      rack: {
        backgroundColor: 'hsl(0, 75%, 65%)',
        flexGrow: 1,
      }
    }
    return (
      <div style={css.container}>
        <div style={css.table}>
          {this.renderCards()}
        </div>
        <div style={css.rack}>

        </div>
      </div>
    );
  }
}

export default App;