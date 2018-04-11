import React from 'react';
import result from 'lodash/result';
import { CATEGORY_QUERY } from '../queries';
import { Query } from 'react-apollo';
import {
  	Text,
	View,
	StyleSheet,
	ScrollView,
	TouchableOpacity
} from 'react-native'

const styles = StyleSheet.create({
	mainCategories: {
		minWidth: 91,
	    padding: 9,
	    marginLeft: 8,
	    borderWidth:1,
	    borderStyle:'solid',
	    borderColor:'#e0e0e0',
	    borderRadius: 15,
	    backgroundColor: '#fafafa',
	},
	text:{
		fontSize: 11,
    	color: '#000',
    	margin: 0,
    	fontWeight: 'normal',
    	textAlign:'center',
	}
})

class MainCategories extends React.Component{

	displayCategories(categories){
		return categories.map(cat =>{
			return <TouchableOpacity style={styles.mainCategories} key={cat.id} onPress={() => this.props.handleOnCategoryTouch(cat.id)}>
					<Text style={styles.text}>{cat.name}</Text>
				</TouchableOpacity>	
		})
	}

	render(){
		const mainCategories = this.props.categories
		return (
			<Query
				query={CATEGORY_QUERY}
				variables={{limit: 20, cursor: "", idcategory: 0}}
			>
				{
					({ data }) => {
						const mainCategories = result(data, 'get_discovery_kol_data.categories', []);
						const errors = result(data, 'get_discovery_kol_data.errors', null);
						return(
							<View style={{padding:5}}>
								<ScrollView horizontal>
									{mainCategories && this.displayCategories(mainCategories)}
								</ScrollView>
							</View>		
						)
			    	}
				}
			</Query>
		)
	}
}
export default MainCategories;

