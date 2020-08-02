import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const GoHomeIcon = styled(HomeIcon)`
    && {
        border: 2px solid rgb(72, 61, 139);
        transition: transform 0.4s;
        color: rgb(255, 255, 255);
        background-color: rgb(72, 61, 139);
        border-radius: 4px;

        &:hover {
            cursor: pointer;
        }
    }
`;

const StyledLink = styled(Link)`
    margin-left: auto;
    position: relative;
    top: 5px;
    right: 10px;
`;

type Props = {};

export const GoHomeBtn: React.FC<Props> = (props) => {
    const {} = props;

    return (
        <StyledLink to='/'>
            <GoHomeIcon />
        </StyledLink>
    );
};
