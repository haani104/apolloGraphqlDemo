import React from 'react'
import { ScrollView, View, FlatList, Text, Image, StyleSheet, Dimensions,ActivityIndicator,Button } from 'react-native'
import { graphql } from 'react-apollo'
import result from 'lodash/result';

import { CATEGORY_QUERY } from '../queries'

let { width,height } = Dimensions.get('window');
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

  constructor(props){
    super(props)
    this.state={
      refetching:false
    }
  }
  onLoadMore=()=>{
    if(this.props.lastCursor){
      this.setState({ refetching: true });
      this.props.fetchMore(this.props.lastCursor,this.props.parent)
      .then(()=> this.setState({ refetching: false }))
      .catch(()=> this.setState({ refetching: false })) 
    }
  }

  render(){
    const categories = this.props.postKol;
    return(
      <View style={styles.container}>
        { this.props.loading ? 
          <View style={styles.horizontal}>
              <ActivityIndicator size="large" color="#00ff00" />
          </View> : 
          <FlatList  numColumns = {3} data = {categories} onEndReachedThreshold={1.0} onEndReached={this.onLoadMore} renderItem = {(info) => {
            return <Image key={info.index} source={{uri: info.item.content[0].imageurl}} style={styles.image}/>
          }}
          />
        }
        {this.state.refetching && 
          <View style={{padding:10}}>
             <ActivityIndicator size="large" color="#00ff00" />
          </View>
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
		postKol: result(data, 'get_discovery_kol_data.postKol', []),
    lastCursor: result(data, 'get_discovery_kol_data.lastCursor', ''),
    errors: result(data, 'get_discovery_kol_data.errors', null),
    fetchMore:(lastCursor,parent) => data.fetchMore({
      variables: { limit: 20, cursor: lastCursor, idcategory: parent},
      updateQuery: (prev, { fetchMoreResult }) => {
        console.log("fetchMoreResult",fetchMoreResult)
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          get_discovery_kol_data: Object.assign({}, prev.get_discovery_kol_data, {
            postKol: prev.get_discovery_kol_data.postKol.concat(fetchMoreResult.get_discovery_kol_data.postKol)  || [],
            lastCursor: fetchMoreResult.get_discovery_kol_data.lastCursor || '',
          })
        });
      }
    })
	})	
}

export default graphql(CATEGORY_QUERY, 
  { options: mapPropsToOptions, props: mapResultsToProps })(Categories)
