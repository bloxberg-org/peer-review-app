import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

// Props:
// icon: FontAwesome icon e.g. import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
// tooltip: Text in tooltip.

export default styled(props => {
  return (
    <div className={props.className}>
      {props.tooltip &&
        <ReactTooltip
          className='tooltip'
          place='bottom'
          effect='solid'
        />}
      <FontAwesomeIcon data-tip={props.tooltip} {...props} />
    </div>
  );
})`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.1s;
  &:hover {
    cursor: pointer;
    opacity: 0.75;
  }
  .tooltip {
    font-size: 10px;
  }
`;
