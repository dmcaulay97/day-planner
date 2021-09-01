import React from 'react'
import { Route, Redirect } from 'react-router'
import auth from '../utils/auth'

const loggedIn = auth.loggedIn()

const ProtectedRoute = ({ component: Comp, path, ...rest }) => {
    return (
        <Route
            path={path}
            {...rest}
            render={(props) => {
                return loggedIn ? <Comp {...props} /> : <Redirect to="/" />
            }}
        />
    )
}

export default ProtectedRoute