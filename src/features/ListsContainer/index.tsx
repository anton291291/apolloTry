import React, { useEffect, useState } from 'react';

import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { searchVar } from '@/shared/cache';
import { useDebouncedCallback } from 'use-debounce/lib';
import { LinearLoader } from '@/shared/components/LinearLoader';
import { TitleList } from './TitleList';
import { List as SearchedList } from '@/shared/components/List';

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

type Props = {};

export const ListsContainer: React.FC<Props> = (props) => {
    const {} = props;

    const { data: cachedSearchValue } = useQuery(GET_CACHED_SEARCH_VALUE);
    const { data: cachedGenreFilters } = useQuery(GET_CACHED_GENRE_FILTERS);

    const [makeSearch, { data, loading, fetchMore }] = useLazyQuery(
        GET_SEARCHED_TITLE
    );

    const searchValue = cachedSearchValue.search.searchInputValue;
    const genresValues = cachedGenreFilters.filters.genresValues.map(
        (obj) => obj.value
    );

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
