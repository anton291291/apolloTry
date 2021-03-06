import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { GenresChips } from '@/shared/components/GenresChips';
import { RatingChip } from '@/shared/components/RatingChip';
import { StyledSkeleton } from '@/shared/styled components';
import { useImageLoad } from '@/shared/hooks/useImageLoad';

const CardImage = styled(CardMedia)`
    && {
        height: 350px;
    }
`;

const Container = styled.div`
    margin: 10px auto;
    max-width: 1100px;
`;

type Props = {
    image: string;
    title: string;
    description: string;
    genres: Array<string>;
    rating: number;
    date: string;
    id: number;
};

export const TitleItem: React.FC<Props> = (props) => {
    const { image, description, title, genres, rating, date, id } = props;

    const { imageSrc, loading } = useImageLoad(
        image,
        'https://www.purefandom.com/wp-content/uploads/2018/12/Deku-crying-780x405.png'
    );

    return (
        <Container>
            <Card>
                <CardActionArea>
                    <Link exact to={`anime/${id}`}>
                        {loading ? (
                            <StyledSkeleton
                                animation='pulse'
                                variant='rect'
                                height={350}
                            />
                        ) : (
                            <CardImage component='img' src={imageSrc} />
                        )}
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant='h5'
                                component='h2'
                            >
                                {title} {date}
                            </Typography>

                            <Typography
                                noWrap
                                variant='body2'
                                color='textSecondary'
                                component='p'
                            >
                                {description}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Box display='flex' alignItems='center'>
                                <GenresChips genres={genres} />
                                <RatingChip ratingData={rating} />
                            </Box>
                        </CardContent>
                    </Link>
                </CardActionArea>
                <CardActions>
                    <Button size='small' color='primary'>
                        Share
                    </Button>
                </CardActions>
            </Card>
        </Container>
    );
};
