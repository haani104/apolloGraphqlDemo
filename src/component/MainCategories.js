import React from 'react';
import result from 'lodash/result';
import Categories from './Categories';
import { CATEGORY_QUERY } from '../queries';
import { graphql } from 'react-apollo';

import {
  Text,
	View,
	StyleSheet
} from 'react-native'

const styles = StyleSheet.create({

})

class MainCategories extends React.Component{
	render(){
		console.log("maincategories",this.props.categories)
		return (
			<View>
				<Text>inside main Categories</Text>
			</View>		
			)
	}
}

const mapPropsToOptions = ({ parent }) => {
	return ({
		variables: { limit: 20, cursor: "", idcategory: 0}
	})
	
}
const mapResultsToProps = ({ data }) => {
	return ({
		loading: data.loading,
		categories: result(data, 'get_discovery_kol_data.categories', []),
		errors: result(data, 'get_discovery_kol_data.errors', null),
	})
	
}

export default graphql(CATEGORY_QUERY, 
{ options: mapPropsToOptions, props: mapResultsToProps })(MainCategories)

