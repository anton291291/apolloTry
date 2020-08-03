import React from 'react';

import { ToTopBtn } from '@/shared/components/ToTopBtn';
import { Header } from '@/features/Header';
import { Box } from '@material-ui/core';
import { ListsContainer } from '@/features/ListsContainer';

type Props = {};

const Home: React.FC<Props> = (props) => {
    const {} = props;

    return (
        <>
            <Header />
            <Box mb={20} />
            <ToTopBtn />
            <ListsContainer />
        </>
    );
};

export default Home;
