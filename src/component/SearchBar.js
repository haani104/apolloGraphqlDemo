import React from 'react'
import { TextInput } from 'react-native'

class Searchbar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props)
    return (
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(text) => this.props.onChangeText(text)}
        value={this.props.text}
        placeholder='Enter Text'
      />
    );
  }
}

export default Searchbar