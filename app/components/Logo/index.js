/**
*
* Logo
*
*/

import React from 'react';
import styled from 'styled-components';

const Pipe = styled.h3`
  font-family: 'Courgette', cursive;
  text-align: center;
  font-size: 20px;
  margin-top: 0px;
  color: #95A5A6;
`;

const Frame = styled.div`
  background: white;
  border: 1px solid gray;
  margin-top:50px;
`;

class Logo extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Frame className="text-center">
        <svg
          id="svg"
          xmlns="http://www.w3.org/2000/svg"
          className="logo"
          viewBox="-200 -200 300 400"
          width="200"
          height="200"
          preserveAspectRatio="xMidYMid meet"
        >
          <g id="main">
            <line
              id="stem"
              x1="-54.857142857142854"
              y1="146.28571428571428"
              x2="0"
              y2="-109.71428571428571"
              strokeLinecap="round"
              stroke="#196e34"
              strokeWidth="12"
            ></line>

            <path
              id="back"
              d="M-55.04446726221167 101.68675903976624 C-55.04446726221166 221.68675903976623 -252.80912366759105 -202.84881810316645 -151.1823750913495 -160.75364054300658 -185.62388400420758 -77.60448261699078 -1.1335574756541718 -119.0944429507939 82.01560045036165 -84.65293403793584 117.37093950968902 -49.297594978608466 74.29866728936847 155.26243957087883 -55.04446726221167 101.68675903976624 Z"
              stroke="#000000"
              fill="#e14907"
              strokeWidth="4"
              strokeLinecap="round"
            ></path>

            <path
              id="front"
              d="M69.90439063724754 -62.07949989045862 C19.904390637247545 -62.079499890458614 53.68186012169869 -131.17808909371712 -56.31813987830131 -131.17808909371712 -56.318139878301324 -191.17808909371712 -18.172266289268734 -174.83163466508188 -119.79901486551029 -132.73645710492204 -249.7990148655103 -132.736457104922 -22.483562613881134 -23.81115665394963 69.90439063724754 -62.07949989045862 Z"
              stroke="#000000"
              fill="#e098a5"
              strokeWidth="4"
              strokeLinecap="round"
            ></path>
          </g>

        </svg>
        <Pipe>
          ceci n&apos;est pas une tulipe
        </Pipe>
      </Frame>
    );
  }
}

Logo.propTypes = {

};

export default Logo;
