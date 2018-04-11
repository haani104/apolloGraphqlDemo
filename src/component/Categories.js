import React from 'react'
import { View, FlatList, Image, StyleSheet, Dimensions,ActivityIndicator } from 'react-native';
import { Query } from 'react-apollo'
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
  onLoadMoreHandeler=(onLoadMore,lastCursor)=>{
    if(lastCursor){
      this.setState({ refetching: true });
      onLoadMore(lastCursor)
      .then(()=> this.setState({ refetching: false }))
      .catch(()=> this.setState({ refetching: false })) 
    }
  }

  render(){
    const parent = this.props.parent;
    return(
      <Query
        query={CATEGORY_QUERY}
        variables={{limit: 20, cursor: "", idcategory: this.props.parent}}
      >
        {
          ({loading,data,fetchMore})=>{
            const categories = result(data, 'get_discovery_kol_data.postKol', []);
            const lastCursor = result(data, 'get_discovery_kol_data.lastCursor', '');
            const errors = result(data, 'get_discovery_kol_data.errors', null);
            const onLoadMore = (lastCursor) =>{
              return fetchMore({
                variables: { limit: 20, cursor: lastCursor, idcategory: parent},
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev;
                  return Object.assign({}, prev, {
                    get_discovery_kol_data: Object.assign({}, prev.get_discovery_kol_data, {
                      postKol: prev.get_discovery_kol_data.postKol.concat(fetchMoreResult.get_discovery_kol_data.postKol)  || [],
                      lastCursor: fetchMoreResult.get_discovery_kol_data.lastCursor || '',
                    })
                  });
                }
              })
            }
            return(
               <View style={styles.container}>
                { loading ? 
                  <View style={styles.horizontal}>
                      <ActivityIndicator size="large" color="#00ff00" />
                  </View> : 
                  <FlatList  numColumns = {3} data = {categories} onEndReachedThreshold={1.0} onEndReached={()=>this.onLoadMoreHandeler(onLoadMore,lastCursor)} renderItem = {(info) => {
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
      </Query>
    )
  }
}



export default Categories;
