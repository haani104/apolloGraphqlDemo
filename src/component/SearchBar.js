import React from 'react'
import { TextInput, StyleSheet, View } from 'react-native'
import { debounce } from 'lodash'

class Searchbar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{
        paddingHorizontal: 16,
      }}>
        <TextInput
          inlineImageLeft='search_icon'
          placeholder='Cari inspirasi atau Top Profiles kamu'
          placeholderTextColor='rgba(0,0,0,.38)'
          style={styles.searchTextBox}
          value={this.props.searchText}
          maxLength={30}
          returnKeyType='search'
          underlineColorAndroid='transparent'
          onChangeText={
            (text) => {
              this.props.handleChangeText(text)
            }
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchTextBox: {
    height: 50,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    fontSize: 16,
    backgroundColor: '#f6f6f6',
  },
  closeIconWrapper: {
    position: 'absolute',
    right: 10,
    top: 15,
  }
})


export default Searchbar