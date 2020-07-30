import React from 'react';

import styled from 'styled-components';
import { AppBar, Toolbar } from '@material-ui/core';
import { Search } from './Search';

const StyledAppBar = styled(AppBar)`
    height: 50px;
    display: flex;
    justify-content: center;

    &&.MuiAppBar-colorPrimary {
        color: rgb(255, 255, 255);
        background-color: rgb(72, 61, 139);
    }
`;

type Props = {};

export const Header: React.FC<Props> = (props) => {
    const {} = props;

    return (
        <StyledAppBar position='fixed'>
            <Toolbar>
                <Search />
            </Toolbar>
        </StyledAppBar>
    );
};
