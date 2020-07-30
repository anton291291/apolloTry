import React, { useEffect, useState } from 'react';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import styled from 'styled-components';
import { Fade } from '@material-ui/core';

const Arrow = styled(ArrowDownwardIcon)`
    && {
        transform: rotate(180deg);
        border: 2px solid rgb(72, 61, 139);
        position: fixed;
        transition: transform 0.4s;
        left: 50px;
        top: 90px;
        color: rgb(255, 255, 255);
        background-color: rgb(72, 61, 139);
        border-radius: 4px;

        &:hover {
            cursor: pointer;
        }
    }
`;

type Props = {};

export const ToTopBtn: React.FC<Props> = (props) => {
    const {} = props;

    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        document.addEventListener('scroll', () => {
            window.pageYOffset > 1000 ? setIsShow(true) : setIsShow(false);
        });
    });

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <>
            {isShow && (
                <Fade in={true} timeout={400} unmountOnExit>
                    <Arrow onClick={scrollToTop} />
                </Fade>
            )}
        </>
    );
};
