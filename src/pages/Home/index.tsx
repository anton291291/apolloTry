import React, { useEffect } from 'react';
import { TitleList } from '@/features/TitleList';
import { ToTopBtn } from '@/shared/components/ToTopBtn';
import { Header } from '@/features/Header';
import { Box } from '@material-ui/core';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import { useDebouncedCallback } from 'use-debounce/lib';
import { SearchedList } from '@/features/SearchedList';
import { Loader } from '@/shared/components/Loader';

type Props = {};

const GET_CACHED_SEARCH_VALUE = gql`
    query {
        search @client {
            searchInputValue
        }
    }
`;

const GET_SEARCHED_TITLE = gql`
    query($search: String, $page: Int) {
        Page(page: $page, perPage: 10) {
            media(search: $search) {
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
                averageScore
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

    const [makeSearch, { data, loading, fetchMore }] = useLazyQuery(
        GET_SEARCHED_TITLE
    );

    const value = cachedSearchValue.search.searchInputValue;

    const [debouncedSearch] = useDebouncedCallback((value) => {
        makeSearch({
            variables: {
                search: value,
                page: 1
            }
        });
    }, 1000);

    useEffect(() => {
        value && debouncedSearch(value);
    });

   

    return (
        <>
            <Header />
            <Box mb={20} />
            <ToTopBtn />
           {/*  {loading && <Loader />} */}
            {value && data?.Page.media ? (
                <SearchedList
                    data={data}
                    fetchMore={fetchMore}
                    loading={loading}
                />
            ) : (
                <TitleList />
            )}
        </>
    );
};

export default Home;
