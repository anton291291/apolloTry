import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { TitleItem } from '../TitleItem';
import { Loader } from '@/shared/components/Loader';
import { LinearLoader } from '@/shared/components/LinearLoader';
import { useDebouncedCallback } from 'use-debounce/lib';
import { FetchMoreType } from '@/shared/types';

const Container = styled.div`
    padding-left: 20%;
    padding-right: 20%;
`;

type Props = {
    data: Array<any>;
    fetchMore: FetchMoreType;
    loading: Boolean;
};

export const SearchedList: React.FC<Props> = (props) => {
    const { data, fetchMore, loading } = props;

    const [isLoading, setIsLoading] = useState(false);

    const [loadMore] = useDebouncedCallback(() => {
        setIsLoading(true);
        fetchMore({
            variables: {
                page: data.Page.pageInfo.currentPage + 1
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;

                return {
                    Page: {
                        media: [
                            ...prev.Page.media,
                            ...fetchMoreResult.Page.media
                        ],
                        pageInfo: { ...fetchMoreResult.Page.pageInfo }
                    }
                };
            }
        });
    }, 200);

    useEffect(() => {
        const selector = document.querySelector('#searchScrollList');
        document.addEventListener('scroll', () => {
            selector?.offsetHeight -
                (window.pageYOffset + document.documentElement.clientHeight);

            const bottomoOffset =
                selector?.offsetHeight -
                (window.pageYOffset + document.documentElement.clientHeight);

            bottomoOffset < 900 && loadMore();
        });
        setIsLoading(false);
    });

    if (loading) return <Loader />;

    return (
        <Container id='searchScrollList'>
            {data.Page.media.map((item) => (
                <TitleItem
                    id={item.id}
                    date={`(${item.startDate.year})`}
                    rating={item.meanScore}
                    genres={item.genres}
                    key={item.id}
                    image={item.bannerImage}
                    title={item.title.romaji}
                    description={item.description}
                />
            ))}
            {isLoading && <LinearLoader />}
        </Container>
    );
};
