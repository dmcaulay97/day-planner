import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query {
    me {
      _id
      username
      email
      events {
        _id
        description
	      title
	      date
      }
      tasks{
        _id
        title
        completed
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($priceId: ID!) {
    checkout(priceId: $priceId) {
      session
    }
  }
`;