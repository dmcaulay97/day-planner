import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_EVENT = gql`
mutation saveEvent( $description: String!, $title: String!, $date: Int!){
	 saveEvent(description: $description, title: $title, date: $date){
		_id
		username
    events{
      date
      description
      title
    }
	 }
	}
`

export const REMOVE_EVENT = gql`
mutation removeEvent ($_id: ID!){
	removeBook (_id: $_id){
		_id
		username
	}
}
`
