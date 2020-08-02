import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';
import { TitleItem } from '../TitleItem';
import { useDebouncedCallback } from 'use-debounce';
import { LinearLoader } from '@/shared/components/LinearLoader';

const Container = styled.div`
    padding-left: 20%;
    padding-right: 20%;
`;

const GET_TITLE_LIST = gql`
    query($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
            media {
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

export const TitleList: React.FC<Props> = (props) => {
    const {} = props;

    const { loading, error, data, fetchMore } = useQuery(GET_TITLE_LIST, {
        variables: { page: 0, perPage: 10 }
    });

    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const [loadMore] = useDebouncedCallback(() => {
        setIsLoadingMore(true);
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
        const selector = document.querySelector('#InfScrollList');
        document.addEventListener('scroll', () => {
            selector?.offsetHeight -
                (window.pageYOffset + document.documentElement.clientHeight);

            const bottomoOffset =
                selector?.offsetHeight -
                (window.pageYOffset + document.documentElement.clientHeight);

            bottomoOffset < 900 && loadMore();
        });
        setIsLoadingMore(false);
    });

    if (loading) return <LinearLoader/>;

    if (error) return <div>Error</div>;

    return (
        <Container id='InfScrollList'>
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
            {isLoadingMore && <LinearLoader />}
        </Container>
    );
};
