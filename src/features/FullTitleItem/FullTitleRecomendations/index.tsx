import React from 'react';

import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Tile } from '@/shared/styled components';
import { Box, Typography, Tooltip } from '@material-ui/core';
import { FullTitleRecommendationItem } from './FullTitleRecommendationItem';

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1
    /*  autoplay: true,
    autoplaySpeed: 1000,
    cssEase: 'linear' */
};

const StyledSlider = styled(Slider)`
    && {
        .slick-prev:before,
        .slick-next:before {
            color: rgb(255, 215, 0);
            font-size: 35px;
        }

        .slick-prev {
            left: -55px;
        }

        .slick-next {
            right: -38px;
        }
    }
`;

type Props = {
    recommendedTitles: Array<string | {}>;
};

export const FullTitleRecomendations: React.FC<Props> = (props) => {
    const { recommendedTitles } = props;

    return (
        <Tile>
            <Typography gutterBottom variant='h6' align='center'>
                Recommendations
            </Typography>
            <StyledSlider {...settings}>
                {recommendedTitles.map(({ mediaRecommendation }) => (
                    <FullTitleRecommendationItem
                        linkTo={mediaRecommendation.id}
                        image={mediaRecommendation.coverImage.large}
                        tooltipTitle={mediaRecommendation.title.romaji}
                        rating={mediaRecommendation.meanScore}
                    />
                ))}
            </StyledSlider>
        </Tile>
    );
};
