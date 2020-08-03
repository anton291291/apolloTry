import React from 'react';

import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import { List } from '@/shared/components/List';
import { Page } from '@/generated/graphql';

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

    const { loading, error, data, fetchMore } = useQuery<{ Page: Page }>(
        GET_TITLE_LIST,
        {
            variables: { page: 0, perPage: 10 }
        }
    );

    return <List data={data} loading={loading} fetchMore={fetchMore} />;
};
