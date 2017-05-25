function Application() {
   {/* Components must return a single virtual DOM element, therefore the h1 and p are wrapped in a div */}
  return (
    <div>
      <h1>Hello from React</h1>
      <p>I was rendered from the Application component.</p>
    </div>
    );
}

ReactDOM.render(< Application />, document.getElementById('container'));