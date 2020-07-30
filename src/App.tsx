import React from 'react';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { AppRoutes } from './routes/AppRoutes';
import { createGlobalStyle } from 'styled-components';
import { cache } from './shared/cache';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: rgb(255, 245, 238);
    margin: 0;
    
  }

  a {
      text-decoration: none;
      color: inherit;
  }

  tspan {
    font-family: Roboto;
    font-size: smaller;
    color: black;
  }
`;

const client = new ApolloClient({
    uri: 'https://graphql.anilist.co',
    cache: cache
});

export const App: React.FC<{}> = (props) => {
    return (
        <ApolloProvider client={client}>
            <GlobalStyle />
            <AppRoutes />
        </ApolloProvider>
    );
};


