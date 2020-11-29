import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';

const rootEl = document.getElementById('app-site');

Sentry.init({
  dsn: 'https://fd969b2acc9d4d7d875320b1ee8efafe@o421766.ingest.sentry.io/5342030',
  // ...
});
// Create a reusable render method that we can call more than once
let render = () => {
  // Dynamically import our main App component, and render it
  const MainApp = require('./MainApp').default;
  ReactDOM.render(
    <MainApp/>,
    rootEl
  );
};


if (module.hot) {
  module.hot.accept('./MainApp', () => {
    const MainApp = require('./MainApp').default;
    render(
      <MainApp/>,
      rootEl
    );
  });
}

render();
