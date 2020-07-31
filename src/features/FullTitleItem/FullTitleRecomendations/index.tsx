import React from 'react';

import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Tile } from '@/shared/styled components';
import { Box, Typography, Tooltip } from '@material-ui/core';

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1
    /*  autoplay: true,
    autoplaySpeed: 1000,
    cssEase: 'linear' */
};

const Cover = styled.img`
    margin: 0 5px;
    width: 180px !important;
    height: 280px;
    box-shadow: 0 0 5px;
`;

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

const StyledTooltip = styled(Tooltip)``;

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
                    <Link to={`/anime/${mediaRecommendation.id}`}>
                        <StyledTooltip
                            arrow
                            title={`${mediaRecommendation.title.romaji}
                        //
                        Rating: ${mediaRecommendation.meanScore}`}
                        >
                            <Cover src={mediaRecommendation.coverImage.large} />
                        </StyledTooltip>
                    </Link>
                ))}
            </StyledSlider>
        </Tile>
    );
};
