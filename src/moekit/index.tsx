import styled from "styled-components";

export const theme = {
  colors: {
    primary: '#1bae98',
    bodyD1: '#32353b'
  }
};

export const Form = styled.form`
  display: grid;
  grid-gap: 16px;
`;

export const Label = styled.label`
  font-weight: 600;
  margin-bottom: 6px;
  display: block;
`;

export const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  display: block;
  padding: 14px;
  border: 1px solid #2b2d31;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${p => p.theme.colors.primary};
  }

  border-radius: 4px;

  color: #dcddde;
  background-color: #40444B;
`;

export const FormControl = styled.div`
`;

export const Button = styled.button`
  background-color: ${p => p.theme.colors.primary};
  box-sizing: border-box;
  color: #dcddde;
  border: none;
  font-size: 16px;
  padding: 12px;
  border-radius: 4px;
`;