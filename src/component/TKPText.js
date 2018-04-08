import React from 'react'
import ReactNative, { StyleSheet } from 'react-native'

export function CardText({ style, ...props }) {
  return <ReactNative.Text style={[styles.cardText, style]} {...props} />
}

export function UserText({style, ...props}) {
  return <ReactNative.Text style={[styles.userText, style]} {...props} />
}

export function CommentText({style, ...props}) {
  return <ReactNative.Text style={[styles.commentText, style]} {...props} />
}

export function HorizontalRule({ style, ...props }) {
  return <ReactNative.View style={[styles.hr, style]} {...props} />;
}

export function LinkText({style, ...props}) {
  return <ReactNative.Text style={[styles.linkText, style]} {...props} />
}

const styles = StyleSheet.create({
  cardText: {
    // fontFamily: 'OpenSans',
    color: 'white',
    textAlign: 'left',
  },
  hr: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,.12)',
  },
  userText: {
    // fontFamily: 'sans-serif-medium',
    color: 'black'
  },
  commentText: {
    // fontFamily: 'sans-serif-medium',
    color: 'rgba(0,0,0,.54)',
  },
  linkText: {
    color: '#42b549',
  }
})