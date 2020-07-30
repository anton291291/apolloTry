import styled from 'styled-components';
import { Chip } from '@material-ui/core';

export const Tile = styled.div`
    background-color: white;
    border: 0;
    border-radius: 10px;
    padding: 10px;
    margin: 20px;
    box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.1);
`;

export const StyledChip = styled(Chip)<{ bColor: string }>`
    && {
        color: white;
        margin-right: 5px;
        background-color: ${({ bColor }) => bColor};
    }
`;

export const StyledInput = styled.input`
    position: relative;
    height: 20px;
    border-radius: 10px;
    border: 0;

    &:focus {
        outline: unset;
    }
`;
