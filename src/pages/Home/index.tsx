import React, { useEffect, useState } from 'react';
import { TitleList } from '@/features/TitleList';
import { ToTopBtn } from '@/shared/components/ToTopBtn';
import { Header } from '@/features/Header';
import { Box } from '@material-ui/core';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import { useDebouncedCallback } from 'use-debounce/lib';
import { SearchedList } from '@/features/SearchedList';
import { searchVar, genreFilterVar } from '@/shared/cache';
import { LinearLoader } from '@/shared/components/LinearLoader';

type Props = {};

const GET_CACHED_SEARCH_VALUE = gql`
    query {
        search @client {
            searchInputValue
        }
    }
`;

const GET_CACHED_GENRE_FILTERS = gql`
    query {
        filters @client {
            genresValues
        }
    }
`;

const GET_SEARCHED_TITLE = gql`
    query($genre: [String], $search: String, $page: Int) {
        Page(page: $page, perPage: 10) {
            media(genre_in: $genre, search: $search) {
                id
                description
                bannerImage
                title {
                    romaji
                }
                genres
                startDate {
                    year
                }
                endDate {
                    year
                }
                meanScore
            }
            pageInfo {
                currentPage
                hasNextPage
            }
        }
    }
`;

const Home: React.FC<Props> = (props) => {
    const {} = props;

    const { data: cachedSearchValue } = useQuery(GET_CACHED_SEARCH_VALUE);
    const { data: cachedGenreFilters } = useQuery(GET_CACHED_GENRE_FILTERS);

    const [makeSearch, { data, loading, fetchMore }] = useLazyQuery(
        GET_SEARCHED_TITLE
    );

    const searchValue = cachedSearchValue.search.searchInputValue;
    const genresValues = cachedGenreFilters.filters.genresValues;

    const { searchInputValue, isLoading } = searchVar();

    searchVar({ searchInputValue, isLoading: loading });

    const [debouncedSearch] = useDebouncedCallback((variables: object) => {
        makeSearch(variables);
    }, 1000);

    useEffect(() => {
        searchValue &&
            debouncedSearch({
                variables: {
                    search: searchValue,
                    page: 1
                }
            });

        genresValues.length &&
            debouncedSearch({
                variables: {
                    genre: genresValues,
                    page: 1
                }
            });

        genresValues.length !== 0 &&
            searchValue &&
            debouncedSearch({
                variables: {
                    search: searchValue,
                    genre: genresValues,
                    page: 1
                }
            });
    });

    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        searchValue || genresValues.length
            ? setIsSearching(true)
            : setIsSearching(false);

    });

    return (
        <>
            <Header />
            <Box mb={20} />
            <ToTopBtn />
            {loading && <LinearLoader />}
            {isSearching && data?.Page.media && (
                <SearchedList
                    data={data}
                    fetchMore={fetchMore}
                    loading={loading}
                />
            )}
            {!isSearching && !loading && <TitleList />}
        </>
    );
};

export default Home;
