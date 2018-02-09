import React, { PureComponent } from 'react';

class Login extends PureComponent {
    render() {
        return (
            <div>
                <form method="GET" action="/user/id">
                    <input type="text"/>
                    <input type="password"/>
                    <button type="sumbit">Log in</button>
                    <button tpye="submit">Register and log in</button>
                </form>
            </div>
        )
    }
}

export default Login;