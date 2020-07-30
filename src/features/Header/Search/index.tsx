import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import { Box, CircularProgress } from '@material-ui/core';
import { StyledInput } from '@/shared/styled components';
import { searchVar } from '@/shared/cache';

const Icon = styled(SearchIcon)`
    position: absolute;
    top: 0px;
    left: 2px;
    color: black;
    z-index: 2;
`;

const SearchInput = styled(StyledInput)`
    padding-left: 25px;
    padding-right: 25px;
`;

const SearchProgress = styled(CircularProgress)`
    && {
        position: absolute;
        right: 6px;
        top: 3px;
        z-index: 2;
        &&.MuiCircularProgress-colorPrimary {
            color: rgb(72, 61, 139);
        }
    }
`;

type Props = {};

export const Search: React.FC<Props> = (props) => {
    const {} = props;

    const { searchInputValue } = searchVar();

    const handleSearch = (e: SyntheticEvent) => {
        searchVar({ searchInputValue: (e.target as HTMLInputElement).value });
    };

    return (
        <Box position='relative' display='flex'>
            <Icon />
            <SearchInput value={searchInputValue} onChange={handleSearch} />
            {/* {loading && <SearchProgress size={15} />} */}
        </Box>
    );
};
