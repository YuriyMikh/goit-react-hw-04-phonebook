import PropTypes from 'prop-types';

import { StyledButton, StyledLi, StyledUl } from './ContactList.styled';

export const ContactList = ({ contacts = [], deleteContact }) => {
  return (
    <StyledUl>
      {contacts.map(item => (
        <StyledLi key={item.id}>
          {item.name}: {item.number}
          <StyledButton onClick={() => deleteContact(item.id)}>
            Delete
          </StyledButton>
        </StyledLi>
      ))}
    </StyledUl>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func.isRequired,
};
