import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import { Box, CircularProgress, Fade } from '@material-ui/core';
import { StyledInput } from '@/shared/styled components';
import { searchVar } from '@/shared/cache';
import ClearIcon from '@material-ui/icons/Clear';
import { gql, useQuery } from '@apollo/client';

const IconClear = styled(ClearIcon)`
    position: absolute;
    top: 3px;
    right: 5px;
    color: rgb(72, 61, 139);

    &:hover {
        cursor: pointer;
    }
`;

const IconSearch = styled(SearchIcon)`
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

const GET_CACHED_SEARCH_VALUE = gql`
    query {
        search @client {
            searchInputValue
        }
    }
`;

type Props = {};

export const Search: React.FC<Props> = (props) => {
    const {} = props;

    useQuery(GET_CACHED_SEARCH_VALUE);

    const { searchInputValue, isLoading } = searchVar();

    const handleClear = () => {
        searchVar({ searchInputValue: '', isLoading });
    };

    const handleSearch = (e: SyntheticEvent) => {
        searchVar({
            searchInputValue: (e.target as HTMLInputElement).value,
            isLoading
        });
    };

    return (
        <Box position='relative' display='flex'>
            <IconSearch />
            <SearchInput value={searchInputValue} onChange={handleSearch} />
            {isLoading && searchInputValue && <SearchProgress size={20} />}
            {!isLoading && searchInputValue && (
                <Fade in={true}>
                    <IconClear onClick={handleClear} />
                </Fade>
            )}
        </Box>
    );
};
