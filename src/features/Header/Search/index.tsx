import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import { Box, CircularProgress } from '@material-ui/core';
import { StyledInput } from '@/shared/styled components';
import { searchVar } from '@/shared/cache';

const Icon = styled(SearchIcon)`
    position: absolute;
    top: 3px;
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
        right: 5px;
        top: 4px;
        z-index: 2;
        &&.MuiCircularProgress-colorPrimary {
            color: rgb(72, 61, 139);
        }
    }
`;

type Props = {};

export const Search: React.FC<Props> = (props) => {
    const {} = props;

    const { searchInputValue, isLoading } = searchVar();

    const handleSearch = (e: SyntheticEvent) => {
        searchVar({ searchInputValue: (e.target as HTMLInputElement).value, isLoading });
    };

    return (
        <Box position='relative' display='flex'>
            <Icon />
            <SearchInput value={searchInputValue} onChange={handleSearch} />
            {isLoading && searchInputValue && <SearchProgress size={20} />}
        </Box>
    );
};
