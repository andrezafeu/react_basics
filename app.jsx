function Application() {
   {/* Components must return a single virtual DOM element, therefore the h1 and p are wrapped in a div */}
  return (
    <div className='scoreboard'>
      <div className='header'>
        <h1>Scoreboard</h1>
      </div>

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

ReactDOM.render(< Application />, document.getElementById('container'));