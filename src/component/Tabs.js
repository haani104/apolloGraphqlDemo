import React from 'react'
import { View } from 'react-native'
import { Tab } from 'unify-react-native'

import CategoryContainer from './CategoryContainer'
import TopProfileContainer from './TopProfileContainer'

class Tabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      indexActiveTab: 0,
    }
  }

  handleChangeTab = () => {
    if (this.state.indexActiveTab === 0) {
      this.setState({ indexActiveTab: 1 })
    } else {
      this.setState({ indexActiveTab: 0 })
    }
  }

  render() {
    return (
      <View>
        <Tab secondary
          items={[
            { key: 0, text: "Inspiration" },
            { key: 1, text: "Top Profiles" },
          ]}
          indexActive={this.state.indexActiveTab}
          onItemPress={this.handleChangeTab}
        />
        {
          this.state.indexActiveTab === 0 ? <CategoryContainer searchText={this.props.searchText}/> : <TopProfileContainer />
        }
      </View>
    )
  }
}

export default Tabs