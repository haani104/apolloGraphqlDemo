import React from 'react';
import { gql } from 'apollo-boost';

export const CATEGORY_QUERY = gql` query getContent($limit: Int!, $cursor: String, $idcategory: Int!) {
  get_discovery_kol_data(limit: $limit, cursor: $cursor, idcategory: $idcategory) {
    error
    categories {
      id
      name
    }
    postKol {
      isLiked
      isFollow
      id
      commentCount
      likeCount
      createTime
      description
      content {
        imageurl
        tags {
          id
          type
          url
          link
          price
          caption
        }
      }
      userName
      userInfo
      userIsFollow
      userPhoto
      userUrl
      userId
    }
    lastCursor
  }
}`