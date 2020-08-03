import React, { useState, useEffect, useRef } from 'react';

import styled from 'styled-components';
import { TitleItem } from '../../../features/TitleItem';
import { Loader } from '@/shared/components/Loader';
import { LinearLoader } from '@/shared/components/LinearLoader';
import { useDebouncedCallback } from 'use-debounce/lib';
import { FetchMoreType } from '@/shared/types';
import { Page } from '@/generated/graphql';

const Container = styled.div`
    padding-left: 20%;
    padding-right: 20%;
`;

type Props = {
    data: { Page: Page };
    fetchMore: FetchMoreType;
    loading: Boolean;
};

export const List: React.FC<Props> = (props) => {
    const { data, fetchMore, loading } = props;

    const [isLoading, setIsLoading] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

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
        document.addEventListener('scroll', () => {
            const bottomoOffset =
                ref.current?.offsetHeight -
                (window.pageYOffset + document.documentElement.clientHeight);

            bottomoOffset < 900 && loadMore();
        });
        setIsLoading(false);
    });

    if (loading) return <LinearLoader />;

    return (
        <Container ref={ref}>
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
