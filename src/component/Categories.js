import React from 'react'
import { ScrollView, View, FlatList, Text,Image } from 'react-native'
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
          <Image 
            style={{width: 50, height: 50,borderColor:'green'}}
            source={{uri:cat.userPhoto}}/>
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
