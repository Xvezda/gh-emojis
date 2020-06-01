/* Copyright (c) 2020 Xvezda <xvezda@naver.com>
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { h, Component, Fragment } from 'preact'
/** @jsx h */
import LazyLoad from 'react-lazyload'
import { CopyToClipboard } from 'react-copy-to-clipboard'

/* TODO: Replace with own component */
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'


class Emoji extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const format = `:${this.props.name}:`
    return (
      <CopyToClipboard
        text={format}
        onCopy={() => {
        }}
      >
        <div
          className="emoji tile is-parent"
          data-name={this.props.name}
        >
          <Tooltip
            placement="bottom"
            trigger={['click']}
            overlay={<span>Copied!</span>}
            destroyTooltipOnHide={true}
          >
            <div
              className="tile is-child box"
            >
              <figure class="image is-16x16">
                <LazyLoad debounce={500} throttle={500} once>
                  <img
                    src={this.props.src}
                    title={format}
                    onLoad={e => (e.target.classList.add('loaded'))}
                  />
                </LazyLoad>
              </figure>
            </div>
          </Tooltip>
        </div>
      </CopyToClipboard>
    )
  }
}


export default Emoji
