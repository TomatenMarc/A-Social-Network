import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'semantic-ui-css/semantic.min.css'
import { CookiesProvider } from 'react-cookie';

export default function Root() {
    return (
        <CookiesProvider>
            <App />
        </CookiesProvider>
    );
}

ReactDOM.render(<Root />, document.getElementById('root'));