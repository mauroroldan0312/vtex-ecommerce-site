import { gql } from "@apollo/client";

export const LOGIN_QUERY = gql`
  query Login($userName: String!, $password: String!) {
    login(username: $userName, password: $password) {
      token
      user {
        id
        username
        name
        lastName
        email
        userType
        createdAt
      }
    }
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      id
      username
      name
      lastName
      email
      userType
      createdAt
    }
  }
`;

export const PRODUCTS_QUERY = gql`
  query Products($queryParams: String!) {
    products(queryParams: $queryParams) {
      productId
      brand
      productTitle
      items {
        itemId
        name
        sellers {
          commertialOffer {
            Price
            ListPrice
            IsAvailable
          }
        }
        images {
          imageId
          imageUrl
        }
      }
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser(
    $id: ID!
    $username: String!
    $name: String!
    $lastName: String!
    $email: String!
    $userType: String!
  ) {
    updateUser(
      id: $id
      username: $username
      name: $name
      lastName: $lastName
      email: $email
      userType: $userType
    ) {
      id
      username
      name
      lastName
      email
      userType
    }
  }
`;
