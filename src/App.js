/* Copyright (c) 2020 Xvezda <xvezda@naver.com>
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { h, Component, Fragment, createRef } from 'preact'
/** @jsx h */

import GithubCorner from 'react-github-corner';
import Emoji from './Emoji.js'


class App extends Component {
  constructor(props) {
    super(props)

    const storedState = localStorage.getItem('state')
    this.state = storedState ? JSON.parse(storedState) : {}

    this.notification = createRef();
  }

  componentDidMount() {
    const options = {
      cache: 'default',
    }

    if (this.state.reset && new Date() < new Date(this.state.reset)) return

    fetch('https://api.github.com/emojis', options)
      .then(response => {
        const remain = parseInt(response.headers.get('X-RateLimit-Remaining')),
          reset = new Date(response.headers.get('X-Ratelimit-Reset') * 1000);
        this.setState({
          error: false,
          remain: remain,
          reset: reset
        })
        return response.json()
      })
      .then(json => {
        this.setState({
          emojis: json
        })
      })
      .catch(err => {
        console.error(err)
        this.setState({
          error: true,
        })
      })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    localStorage.setItem('state', JSON.stringify(this.state))
  }

  render() {
    return (
      <Fragment>
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">GitHub Emojis</h1>
            </div>
          </div>
        </section>
        <div className="container is-fluid">
          {
            !this.state.error
              ? (
                <div className="tile is-ancestor columns is-mobile is-centered is-multiline">
                  {
                    this.state.emojis
                      && Object.entries(this.state.emojis)
                        .map(([name, imgsrc]) => (
                          <Emoji
                            name={name}
                            src={imgsrc}
                            notification={this.notification}
                          />
                        ))
                  }
                </div>
              )
              : (
                <div className="notification is-danger">
                  <p>Failed fetching emojis from API. 😥</p>
                </div>
              )
          }
        </div>
        <GithubCorner
          href="https://github.com/Xvezda/gh-emojis"
          style="position: fixed; top: 0; right: 0"
          target="_blank"
        />
      </Fragment>
    )
  }
}

export default App
