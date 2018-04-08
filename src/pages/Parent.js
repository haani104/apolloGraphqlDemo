import React from 'react'
import { debounce } from 'lodash';
import Home from './Home'

import { View, Dimensions } from 'react-native'

import SearchBar from '../component/SearchBar'
import CategoryContainer from '../component/CategoryContainer'
import Tabs from '../component/Tabs'

class Parent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeCatId: 0,
      searchText: ''
    }

    this.handleChangeText = debounce(this.handleChangeText, 1000, { trailing: true, leading: true });
  }

  handleChangeText = (text) => {
    console.log('handleChangeText called')
    this.setState({
      searchText: text,
    })
  }

  changeCatId = (id) => {
    console.log('ID', id)
    this.setState({
      activeCatId: id,
    })
  }

  handleLoadProducts = () => {
    console.log('LOAD FROM API');
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <SearchBar
          handleChangeText={this.handleChangeText}
          searchText={this.state.searchText}
        />
        <Tabs searchText={this.state.searchText} />
      </View>
    )
  }
}

export default Parent