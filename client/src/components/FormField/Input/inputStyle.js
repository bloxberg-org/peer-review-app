import { css } from 'styled-components';

// Input and textarea styles are shared
const inputStyle = css`
  outline: none;
  border: 1px solid ${props => props.theme.border};
  border-radius: 5px;
  font-family: 'Muli', sans-serif;
  width: 100%;
  padding: 16px 8px;
  margin: 4px 0px;
`;

export default inputStyle;