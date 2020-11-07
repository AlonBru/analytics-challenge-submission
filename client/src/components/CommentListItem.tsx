import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import { ListItemText } from '@material-ui/core';
import { Comment } from '../models';

export interface CommentListItemProps {
  comment: Comment;
}

const CommentListItem: React.FC<CommentListItemProps> = ({ comment }) => (
  <ListItem data-test={`comment-list-item-${comment.id}`}>
    <ListItemText primary={`${comment.content}`} />
  </ListItem>
);

export default CommentListItem;
