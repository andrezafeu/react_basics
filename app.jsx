var PLAYERS = [
  {
    name: 'Jane Doe',
    score: 29,
    id: 1,
  },
  {
    name: 'John Doe',
    score: 28,
    id: 2,
  },
];

var nextId = 3;

var Stopwatch = React.createClass({
  getInitialState: function(){
    return {
      running: false,
    }
  },

  onStart: function() {
    this.setState({ running:true });
  },

  onStop: function() {
    this.setState({ running:false });
  },

  render: function() {
    return (
      <div className="stopwatch">
        <h2>Stopwatch</h2>
        <div className="stopwatch-time">0</div>
        { this.state.running ?
          <button onClick={this.onStop}>Stop</button>
          :
          <button onClick={this.onStart}>Start</button>
        }
        <button onClick={this.onReset}>Reset</button>
      </div>
    );
  }
});

var AddPlayerForm = React.createClass({
  propTypes: {
    onAdd: React.PropTypes.func.isRequired,
  },

  getInitialState: function() {
    return {
      name: "",
    };
  },

  onNameChange: function(e) {
    this.setState({name: e.target.value});
  },

  onSubmit: function(event) {
    event.preventDefault();

    this.props.onAdd(this.state.name);
    this.setState({name: ""});
  },
  render: function(){
    return (
      <div className="add-player-form">
        <form onSubmit={this.onSubmit}>
          <input type="text" value={this.state.name} onChange={this.onNameChange}/>
          <input type="submit" value="Add Player" />
        </form>
      </div>
    );
  }
});

function Stats(props) {
  var totalPlayers = props.players.length;
  {/* 0 is the initial value of total */}
  var totalPoints = props.players.reduce(function(total, player) {
    return total + player.score;
  }, 0)

  return (
    <table className="stats">
      <tbody>
        <tr>
          <td>Players:</td>
          <td>{totalPlayers}</td>
        </tr>
        <tr>
          <td>Total points:</td>
          <td>{totalPoints}</td>
        </tr>
      </tbody>
    </table>
  )
}

Stats.propTypes = {
  players: React.PropTypes.array.isRequired,
};

function Header(props) {
  return (
    <div className='header'>
      <Stats players={props.players}/>
      <h1>{props.title}</h1>
      <Stopwatch />
    </div>
  );
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  players: React.PropTypes.array.isRequired,
};

function Counter(props) {
  {/* Components must return a single virtual DOM element, therefore the contents need to be wrapped in a div */}
  return (
    <div className='counter'>
      <button className='counter-action decrement' onClick={function(){props.onChange(-1);}} > - </button>
      <div className='counter-score'> {props.score} </div>
      <button className='counter-action increment' onClick={function(){props.onChange(1);}} > + </button>
    </div>
  );
}

Counter.propTypes = {
  score: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
}

function Player(props) {
  return (
    <div className='player'>
      <div className='player-name'>
        <a className='remove-player' onClick={props.onRemove}>x</a>
        {props.name}
      </div>
      <div className='player-score'>
        < Counter score={props.score} onChange={props.onScoreChange}/>
      </div>
    </div>
  );
}

Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
  onScoreChange: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired,
};

var Application = React.createClass({

  propTypes: {
    title: React.PropTypes.string,
    initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      score: React.PropTypes.number.isRequired,
      id: React.PropTypes.number.isRequired,
    })).isRequired,
  },

  getDefaultProps: function() {
    return {
      title: 'Scoreboard',
    }
  },

  getInitialState: function() {
    return {
      players: this.props.initialPlayers,

    };
  },

  onScoreChange: function(index, delta) {
    console.log('onScoreChange', index, delta);
    this.state.players[index].score += delta;
    // Tells react that this.state has changed and it should re-render
    this.setState(this.state);
  },

  onPlayerAdd: function(name) {
    console.log('player added', name);
    this.state.players.push({
      name: name,
      score: 0,
      id: nextId,
    });
    this.setState(this.state);
    nextId +=1;
  },

  onRemovePlayer: function(index) {
    {/* Splice: 1st arg is an index of where to start removing items from array. 2nd arg is how many items to remove. */}
    this.state.players.splice(index, 1);
    this.setState(this.state);
  },

  render: function() {
    return (
      <div className='scoreboard'>
        < Header title={this.props.title} players={this.state.players} />
        <div className='players'>
          {this.state.players.map(function(player, index) {
            return (
              <Player
                onScoreChange={function(delta) {this.onScoreChange(index, delta)}.bind(this)}
                onRemove={function() {this.onRemovePlayer(index)}.bind(this)}
                name={player.name}
                score={player.score}
                key={player.id} />
            );
          }.bind(this))}
        </div>
        <AddPlayerForm onAdd={this.onPlayerAdd} />
      </div>
    );
  }
});

ReactDOM.render(< Application initialPlayers={PLAYERS} />, document.getElementById('container'));