import React from 'react';

import styled from 'styled-components';
import { Box, Typography } from '@material-ui/core';
import { Tile, StyledSkeleton } from '@/shared/styled components';
import { GenresChips } from '@/shared/components/GenresChips';
import { RatingChip } from '@/shared/components/RatingChip';
import { useImageLoad } from '@/shared/hooks/useImageLoad';

const Cover = styled.img`
    height: 400px;
    width: 300px;
`;

const Container = styled.div`
    display: flex;
`;

type Props = {
    image: string;
    description: string;
    titleName: string;
    genres: Array<string>;
    rating: number;
};

export const FullTitleHeader: React.FC<Props> = (props) => {
    const { image, description, titleName, genres, rating } = props;

    const { imageSrc, loading } = useImageLoad(
        image,
        'https://www.purefandom.com/wp-content/uploads/2018/12/Deku-crying-780x405.png'
    );

    return (
        <Tile>
            <Container>
                {loading ? (
                    <StyledSkeleton
                        animation='pulse'
                        variant='rect'
                        height='400px'
                        width='300px'
                    />
                ) : (
                    <Cover src={imageSrc} />
                )}
                <Box width='80%' display='flex' flexDirection='column' pl={4}>
                    <Typography variant='h4'>{titleName}</Typography>
                    <p>
                        <Typography variant='body1'>{description}</Typography>
                    </p>
                    <Box
                        mt='auto'
                        mb={3}
                        display='flex'
                        justifyContent='flexStart'
                        alignItems='center'
                    >
                        <GenresChips genres={genres} />
                        <RatingChip ratingData={rating} />
                    </Box>
                </Box>
            </Container>
        </Tile>
    );
};
