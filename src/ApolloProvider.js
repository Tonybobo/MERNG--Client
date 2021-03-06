import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
	uri: 'https://lit-journey-97339.herokuapp.com/'
});

const authLink = setContext(() => {
	const token = localStorage.getItem('jwtToken');
	return {
		headers: { Authorization: token ? `Bearer ${token}` : '' }
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
});

export default (
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
);
