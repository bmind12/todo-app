import React from 'react';
import { render } from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

// Components
import App from './components/App';

// Styles
import './styles/index.css';

const Root = () => {
    return(
        <div>
            <App/>
        </div>
    )
}

render(<Root />, document.getElementById('root'));
registerServiceWorker();
