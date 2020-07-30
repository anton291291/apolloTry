import React from 'react';

import styled from 'styled-components';
import { Box, Typography } from '@material-ui/core';
import { Tile, StyledChip } from '@/shared/styled components';
import { GenresChips } from '@/shared/components/GenresChips';
import { RatingChip } from '@/shared/components/RatingChip';

const Cover = styled.img``;

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
    const { image, description, titleName, genres, rating} = props;

    return (
        <Tile>
            <Container>
                <Cover src={image} />
                <Box display='flex' flexDirection='column' pl={4}>
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
                        <RatingChip ratingData={rating}/>
                    </Box>
                </Box>
            </Container>
        </Tile>
    );
};
