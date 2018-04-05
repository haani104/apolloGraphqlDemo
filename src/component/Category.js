import React from 'react'
import { Chip } from 'unify-react-native'
import { View, Text, TouchableOpacity } from 'react-native'

const Category = ({ c, onCategoryTouch }) => {
	 console.log("in Category",category)
  return (
    <TouchableOpacity onPress={() => onCategoryTouch(c.id)}>
      <View style={{ borderWidth: 1, padding: 10, borderColor: 'green' }}>
        <Text>{c.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Category;







// import React from 'react'
// import { Chip } from 'unify-react-native'
// import { ScrollView,View, Text, TouchableOpacity } from 'react-native'

// class Category extends React.Component{
// 	render(){
// 		  return(
// 			  <View style={{ flex: 1 }}>
// 			  	<Text>HEREEEEeeeeeeeeeee=======</Text>
// 			    <Text>{this.props.categories[0].name}</Text>
// 					{
// 						this.props.categories.map(c => {
// 							return <TouchableOpacity key={c.id} onPress={() => this.props.onCategoryTouch(c.id)}>
// 					    			<View style={{ borderWidth: 1, padding: 10, borderColor: 'green' }}>
// 								        <Text>heloooooooooo</Text>
// 								      </View>
// 							      </TouchableOpacity>
// 						}) 
// 					}
				
// 			 </View>
// 		 )
		
// 	}
// }

// export default Category
