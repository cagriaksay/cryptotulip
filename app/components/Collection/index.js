/**
*
* Collection
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { map, sortBy } from 'underscore';
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
    const { ethereum: { tulips: myTulips }, tulips: propTulips } = this.props;
    const tulips = propTulips || myTulips;

    return (
      <CollectionFrame>
        {map(sortBy(tulips, (t) => -parseInt(t.id, 10)), (t, i) => (
          <TulipBox key={i}>
            <a href={`/tulip/${t.id}`} >
              <Tulip genome={t.genome} width={250} />
              <span>#{t.id}</span>
            </a>
          </TulipBox>
        ))}
        {(!tulips || tulips.length === 0) &&
          <h3>
            no tulips here.
          </h3>
        }
      </CollectionFrame>
    );
  }
}

Collection.propTypes = {
  ethereum: PropTypes.object.isRequired,
  tulips: PropTypes.object,
};


export default withTulipArtist()(Collection);
