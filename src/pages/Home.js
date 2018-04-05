import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

import MainCategories from '../component/MainCategories'

const styles = StyleSheet.create({
	container: {
    marginTop: 40,
    flex: 1,
  }
})

class Home extends React.Component {

  constructor(props){
    super(props);
    this.state={id:0}
  }

  handleOnCategoryTouch = (id) => {
  this.setState({id:id})
  }

  render(){
    return(
          <View style= {styles.container}>
            <MainCategories
              handleOnCategoryTouch={this.handleOnCategoryTouch}
            />
         </View>
      )

  }   
          
 }
export default Home