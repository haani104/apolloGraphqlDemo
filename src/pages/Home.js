import React from 'react'
import {
  View
} from 'react-native'

import MainCategories from '../component/MainCategories'

// const CATEGORY_QUERY = gql` query getContent($limit: Int!, $cursor: String, $idcategory: Int!) {
//   get_discovery_kol_data(limit: $limit, cursor: $cursor, idcategory: $idcategory) {
//     error
//     categories {
//       id
//       name
//     }
//     postKol {
//       isLiked
//       isFollow
//       id
//       commentCount
//       likeCount
//       createTime
//       description
//       content {
//         imageurl
//         tags {
//           id
//           type
//           url
//           link
//           price
//           caption
//         }
//       }
//       userName
//       userInfo
//       userIsFollow
//       userPhoto
//       userUrl
//       userId
//     }
//     lastCursor
//   }
// }`


//this.state ={id:0}

// const handleOnCategoryTouch = (id) => {
//   //Again call the query
//   this.state.id=id;
// }
// const Home = () => (
//   <Query
//     query={CATEGORY_QUERY}
//     variables={{ limit: 20, cursor: "", idcategory: this.state.id}}
//   >
//     {({ loading, error, data }) => {
//       if (loading) return <Text>Loading...</Text>;
//       if (error) return <Text>Error :(</Text>;
//       return (
//         <Categories
//           categories={data.get_discovery_kol_data.categories}
//           content={data.get_discovery_kol_data.postKol}
//           onCategoryTouch={handleOnCategoryTouch}
//         />
//       )
//     }}
//   </Query>
// )

class Home extends React.Component {

  constructor(props){
    super(props);
    this.state={id:0}
  }

  handleOnCategoryTouch = (id) => {
  //Again call the query
  this.setState({id:id})
  }

  render(){
    return(
          <View>
            <MainCategories
              handleOnCategoryTouch={this.handleOnCategoryTouch}
            />
         </View>
      )

  }
  
          
          
 }
export default Home