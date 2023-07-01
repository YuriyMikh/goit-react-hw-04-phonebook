import PropTypes from 'prop-types';

import { StyledInput, StyledLabel } from './Filter.styled';

export const Filter = ({ filterChange, filterValue }) => {
  return (
    <StyledLabel>
      Find contacts by name
      <StyledInput
        type="text"
        onChange={filterChange}
        value={filterValue}
        name="find"
      />
    </StyledLabel>
  );
};

Filter.propTypes = {
  filterChange: PropTypes.func.isRequired,
  filterValue: PropTypes.string.isRequired,
};
