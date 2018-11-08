import React, { Component } from 'react';
import './Animation.css';

export default class Animation extends Component {
  render() {
    return (
      <div>
        <div class="frame">
          <div class="plane-container">
            <a href="http://customer.io/" target="_blank">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                // xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="1131.53px"
                height="379.304px"
                viewBox="0 0 1131.53 379.304"
                enable-background="new 0 0 1131.53 379.304"
                // xml:space="preserve"
                class="plane"
              >
                <polygon
                  fill="#D8D8D8"
                  points="72.008,0 274.113,140.173 274.113,301.804 390.796,221.102 601.682,367.302 1131.53,0.223  "
                />
                <polygon
                  fill="#C4C4C3"
                  points="1131.53,0.223 274.113,140.173 274.113,301.804 390.796,221.102   "
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
