function Header(props) {
  return (
    <div className='header'>
      <h1>{props.title}</h1>
    </div>
  );
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
};

function Application(props) {
  {/* Components must return a single virtual DOM element, therefore the h1 and p are wrapped in a div */}
  return (
    <div className='scoreboard'>
      < Header title={props.title} />

      <div className='players'>
        <div className='player'>
          <div className='player-name'>
            Jane Doe
          </div>
          <div className='player-score'>
            <div className='counter'>
              <button className='counter-action decrement'> - </button>
              <div className='counter-score'> 29 </div>
              <button className='counter-action increment'> + </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Application.propTypes = {
  title: React.PropTypes.string,
};

Application.defaultProps = {
  title: 'Scoreboard',
};

ReactDOM.render(< Application />, document.getElementById('container'));