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
mutation saveEvent( $description: String!, $title: String!, $date: String!){
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
mutation removeEvent($_id: ID!){
	removeEvent(_id: $_id){
		_id
		username
	}
}
`
export const SAVE_TASK = gql`
mutation saveTask($title: String!){
  saveTask(title: $title){
		_id
		username
    tasks{
      title
    }
	 }
	}
`

export const REMOVE_TASK = gql`
mutation removeTask($_id: ID!){
	removeTask(_id: $_id){
		_id
		username
	}
}
`
export const UPDATE_TASK = gql`
mutation updateTask($_id: String!, $completed: Boolean!){
  updateTask(_id: $_id, completed: $completed){
    _id
    username
    tasks{
      title
    }
  }
}
`