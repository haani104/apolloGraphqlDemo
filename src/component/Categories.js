import React from 'react'
import { ScrollView, View, FlatList, Text, Image, StyleSheet, Dimensions,ActivityIndicator, } from 'react-native'
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
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})

class Categories extends React.Component{
  constructor(props) {
    super(props)
  }

  render(){
    const categories = this.props.categories
    return(
      <View style={styles.container}>
      { this.props.loading ? 
        <View style={styles.horizontal}>
            <ActivityIndicator size="large" color="#00ff00" />
      </View> : 
       <FlatList  numColumns = {3} data = {categories} renderItem = {(info) => {
          return <Image key={info.index} source={{uri: info.item.content[0].imageurl}} style={styles.image}/>
        }}
      />
    }
</View>
    )
    
  }
}

const mapPropsToOptions = ({ parent }) => {
	return ({
		variables: { limit: 20, cursor: "", idcategory: parent}
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
