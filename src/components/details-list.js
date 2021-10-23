import styled from 'styled-components';

const DetailsList = styled.dl`
  dt {
    float: left;
    clear: left;
    padding-right: .5em;
    &::after {
      content: ':';
    }
  }

  dd {
    float: left;
  }
`;

export default DetailsList;
