import React from 'react'
import Home from './Home'

class Parent extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            activeCatId: 0,
            searchText: 'aa'
        } 
    }

    changeCatId = (id, refetch) => {
        console.log('ID', id)
        this.setState({
            activeCatId: id,
        })
    }

    render() {
        return (
            <Home
                catId={this.state.activeCatId}
                changeCatId={this.changeCatId}
            />
        )
    }
}

export default Parent