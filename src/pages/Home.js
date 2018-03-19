import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'

import Dog from '../component/Dog'

const GET_DOG = gql`
  query {
    dog(breed: "bulldog") {
      id
      breed
      displayImage
    }
  }
`

const Home = () => (
  <Query query={GET_DOG}>
    {({ loading, error, data }) => {
      if (loading) return <Text>Loading...</Text>;
      if (error) return <Text>Error :(</Text>;

      return (
        <Dog
          url={data.dog.displayImage}
          breed={data.dog.breed}
        />
      )
    }}
  </Query>
)

export default Home