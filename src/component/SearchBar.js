import React from 'react'
import { TextInput, StyleSheet, View } from 'react-native'
import {debounce} from 'lodash'

class Searchbar extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   searchText: ''
    // }
  }

  render() {
    return (
      <View style={{ paddingHorizontal: 10 }}>
        <TextInput
          placeholder='Cari inspirasi atau Top Profiles kamu'
          style={styles.searchTextBox}
          value={this.props.searchText}
          maxLength={30}
          returnKeyType='search'
          underlineColorAndroid='transparent'
          onSubmitEditing={
            () => {

            }
          }
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
  results: {
    position: 'absolute',
    left: 0,
    zIndex: 1001,
    top: 52,
    backgroundColor: '#fff',
    width: '100%',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#e0e0e0',
    maxHeight: 400,
    minHeight: 200,
  },
  searchTextBox: {
    height: 50,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  closeIconWrapper: {
    position: 'absolute',
    right: 10,
    top: 15,
  }
})


export default Searchbar