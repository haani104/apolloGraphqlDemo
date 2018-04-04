import React from 'react'
import Home from './Home'

import { View } from 'react-native'

import SearchBar from '../component/SearchBar'

class Parent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeCatId: 0,
            searchText: ''
        }
    }

    handleChangeText = (text) => {
        this.setState({
            searchText: text,
            activeCatId: 0,
        })
    }

    changeCatId = (id) => {
        console.log('ID', id)
        this.setState({
            activeCatId: id,
        })
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <SearchBar
                    text={this.state.searchText}
                    onChangeText={this.handleChangeText}/>
                <Home
                    catId={this.state.activeCatId}
                    changeCatId={this.changeCatId}
                    searchText={this.state.searchText}
                />
            </View>
        )
    }
}

export default Parent