import React from 'react';
import * as _ from 'lodash';
import Categories from './Categories';
import {CATEGORY_QUERY} from '../queries';
import { graphql } from 'react-apollo';
import {
  Text,
  View
} from 'react-native'

class MainCategories extends React.Component{
	render(){
		console.log("maincategories",this.props.categories)
		return (
			<View>
				{this.props.loading && <Text>Loading...</Text> }
				{this.props.error && <Text>Error :(</Text> }
				{this.props.categories.length && 
					<Categories
	                  categories={this.props.categories}
	                  onCategoryTouch={this.props.handleOnCategoryTouch}
	                />
	            }
			</View>		
			)
	}
}

const mapOptionsToProps = ({ parent }) => ({
  variables: { limit: 20, cursor: "", idcategory: 0}
})

const mapResultsToProps = ({ data }) => ({
  loading: data.loading,
  categories: _.result(data, 'get_discovery_kol_data.categories', []),
  errors: _.result(data, 'get_discovery_kol_data.errors', null),
})


export default graphql(CATEGORY_QUERY, 
{ options: mapOptionsToProps, props: mapResultsToProps })(MainCategories)

