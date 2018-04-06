import React from 'react'
import { ScrollView, View, FlatList, Text, Image, StyleSheet, Dimensions } from 'react-native'
import Category from './Category'
import { graphql } from 'react-apollo'
import result from 'lodash/result';

import { CATEGORY_QUERY } from '../queries'

let { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  image: {
    height: 104,
    width: width/3,
    margin: 2
  },
})

class Categories extends React.Component{
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render(){
    const categories = this.props.categories
    return(
      <FlatList 
        numColumns = {3}
        data = {categories}
        renderItem = {(info) => {
          return(
          <Image key={info.index} 
            source={{uri: info.item.userPhoto }} 
            style={styles.image}/>
        )
        }}
      />

    )
    
  }
}

const mapPropsToOptions = (param) => {
	return ({
		variables: { limit: 20, cursor: "", idcategory: 0}
	})
}

const mapResultsToProps = ({ data }) => {
	return ({
		loading: data.loading,
		categories: result(data, 'get_discovery_kol_data.postKol', []),
    errors: result(data, 'get_discovery_kol_data.errors', null),
	})
	
}

export default graphql(CATEGORY_QUERY, 
  { options: mapPropsToOptions, props: mapResultsToProps })(Categories)
