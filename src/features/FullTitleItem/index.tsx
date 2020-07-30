import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FullTitleHeader } from './FullTitleHeader';
import { useQuery, gql } from '@apollo/client';
import { Loader } from '@/shared/components/Loader';
import { FullTitleInfo } from './FullTitleInfo';
import { FullTitleRecomendations } from './FullTitleRecomendations';
import { Box } from '@material-ui/core';
import { FullTitleTagsChart } from './FullTitleTagsChart';

const Container = styled.div`
    margin: 0 15%;
`;

const GET_FULL_TITLE_INFO = gql`
    query($id: Int) {
        Media(id: $id) {
            id
            title {
                romaji
            }
            countryOfOrigin
            source
            coverImage {
                large
            }
            genres
            meanScore
            popularity
            format
            status
            description
            tags {
                name
                description
                rank
            }
            startDate {
                year
                month
                day
            }
            endDate {
                year
                month
                day
            }
            season
            duration
            recommendations {
                nodes {
                    mediaRecommendation {
                        id
                        averageScore
                        coverImage {
                            large
                        }
                        title {
                            romaji
                        }
                    }
                }
            }
        }
    }
`;

type Props = {};

export const FullTitleItem: React.FC<Props> = (props) => {
    const {} = props;

    const { id } = useParams();

    const { loading, error, data } = useQuery(GET_FULL_TITLE_INFO, {
        variables: { id: id }
    });

    if (loading) return <Loader />;
    if (error) return <div>Error!!!</div>;

    const { Media } = data;

    console.log(Media);

    return (
        <Container>
            <FullTitleHeader
            rating={Media.meanScore}
                genres={Media.genres}
                titleName={Media.title.romaji}
                description={Media.description}
                image={Media.coverImage.large}
            />
            <Box display='flex'>
                <FullTitleInfo
                    duration={Media.duration}
                    countryOfOrigin={Media.countryOfOrigin}
                    format={Media.format}
                    status={Media.status}
                    startDate={new Date(
                        Object.values(Media.startDate)
                    ).toLocaleDateString()}
                    endDate={new Date(
                        Object.values(Media.endDate)
                    ).toLocaleDateString(Media.endDate)}
                    popularity={Media.popularity}
                />
                <FullTitleTagsChart tagsData={Media.tags} />
            </Box>
            {Media.recommendations.nodes.length != 0 && (
                <FullTitleRecomendations
                    recommendedTitles={Media.recommendations.nodes}
                />
            )}
        </Container>
    );
};
