import { css } from 'styled-components';

// Input and textarea styles are shared
const inputStyle = css`
  outline: none;
  border: 1px solid ${props => props.theme.border};
  border-radius: 5px;
  color: ${props => props.theme.gray};
  font-family: 'Muli', sans-serif;
  width: 100%;
  padding: 8px 0px;
  margin-top: 8px;
  &::placeholder {
    padding-left: 8px;
  }
`;

export default inputStyle;