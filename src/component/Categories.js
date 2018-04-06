import React from 'react'
import { ScrollView, View, FlatList, Text } from 'react-native'
import Category from './Category'
import { graphql } from 'react-apollo'
import result from 'lodash/result';

import { CATEGORY_QUERY } from '../queries'

class Categories extends React.Component{
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  getCategories =(categories) => {
    let catArr = []
    categories.forEach((cat,index) => {
      catArr.push(
        <View>
          <Text>{cat.userInfo}</Text>
        </View>
      )
    });
    return catArr
  }
  render(){
    const categories = this.props.categories
    return(
      <View style={{ flex: 1, }}>
      <ScrollView >
        {categories && this.getCategories(categories)}
      </ScrollView>   
    </View>
    )
    
  }
}

const mapPropsToOptions = ({ parent }) => {
	console.log('in map props to option', parent)
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
