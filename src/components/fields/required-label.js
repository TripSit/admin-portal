import styled from 'styled-components';
import { Form } from 'react-bootstrap';

const RequiredLabel = styled(Form.Label)`
  &::after {
    content: '*';
    color: #f00;
  }
`;

export default RequiredLabel;
