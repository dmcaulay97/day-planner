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
mutation saveEvent($title: String!, $start: DateTime!, $end: DateTime!, $category: String!){
	 saveEvent(title: $title, start: $start, end: $end, category: $category){
		_id
		username
    events{
      start
      end
      title
      category
    }
	 }
	}
`

export const REMOVE_EVENT = gql`
mutation removeEvent($_id: String!){
	removeEvent(_id: $_id){
		_id
		username
    events{
      start
      end
      title
      category
    }
	}
}
`

export const UPDATE_EVENT = gql`
mutation updateEvent($_id: String!, $title: String!, $start: DateTime!, $end: DateTime!, $category: String!){
  updateEvent(_id: $_id, title: $title, start: $start, end: $end, category: $category){
    _id
		username
    events{
      start
      end
      title
      category
    }
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
mutation removeTask($_id: String!){
	removeTask(_id: $_id){
		_id
		username
    tasks{
      title
    }
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
export const UPDATE_USER = gql`
  mutation updateUser($username: String!, $email: String!, $password: String!) {
    updateUser(username: $username, email: $email, password: $password) {
        _id
        username
      }
    }
  
`;