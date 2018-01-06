/**
*
* Collection
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { map } from 'underscore';
import { withTulipArtist } from '../WithTulipArtist';
import Tulip from '../Tulip';


const TulipBox = styled.div`
  display: inline-block;
  margin: 10px;
`;

const CollectionFrame = styled.div`
  margin-top: 20px;
  text-align: center;
`;

class Collection extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { ethereum: { tulips } } = this.props;

    return (
      <CollectionFrame>
        {map(tulips, (t, i) => (
          <TulipBox key={i}>
            <Tulip genome={t.genome} width={250} />
          </TulipBox>
        ))}
      </CollectionFrame>
    );
  }
}

Collection.propTypes = {
  ethereum: PropTypes.object.isRequired,
};


export default withTulipArtist()(Collection);
