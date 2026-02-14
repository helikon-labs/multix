import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

const TextFieldLargeStyled = styled(TextField)`
    .MuiInputBase-root {
        height: 3.5rem;
        padding: 0.5rem 0.75rem 0.5rem 1rem;
        border: none;
        border-radius: ${({ theme }) => theme.custom.borderRadius};
        outline: 1.5px solid ${({ theme }) => theme.custom.text.borderColor};

        &:hover {
            border: none;
        }
    }

    .MuiOutlinedInput-notchedOutline {
        border: none;
    }

    fieldset {
        &:hover {
            border: none;
        }
    }

    input {
        font-size: 1rem;
        font-weight: 400;
        color: ${({ theme }) => theme.custom.text.primary};
    }
`;

export default TextFieldLargeStyled;
