import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ReactDom from 'react-dom';
import Home from './home.js';
import List from './list.js';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
            <div>
                sdfdsfdsf
                 <Route path='/' exact component={Home}/>
                 <Route path='/list' component={List}/>
                 <Route path='/def' component={List}/>
             </div>
        </BrowserRouter>
    )
    }
}

ReactDom.render(<App />, document.getElementById('root'));
