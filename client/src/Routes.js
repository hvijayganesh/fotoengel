import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// The PhotoCapture Container Component

import PhotoCaptureContainer from './photoCapture/containers/photoCaptureContainer'


// The Routing Component providing all the routing Configuration

const Routes = (props) => {
    return (
        <BrowserRouter>
            <Switch>

                {/* It's setup at the default index route */}

                <Route path="/" component={PhotoCaptureContainer} />
            </Switch>
        </BrowserRouter>
    )
}

export { Routes }