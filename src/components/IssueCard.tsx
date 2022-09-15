import React, { memo } from 'react';
import { Issue } from '../types/Issue';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface Props {
  task: Issue;
}

export const IssueCard: React.FC<Props> = memo((props: Props) => {
  const { task } = props;

  const createdAt = new Date(task.created_at);
  return (
    <Card sx={{ marginBottom: '10px' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {task.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <a href={task.user.html_url}>{task.user.login}</a>
        </Typography>
        <Typography variant="body2">
          {`#${task.number}`}
        </Typography>
        <Typography variant="body2">
          {createdAt.toDateString()}
        </Typography>
        <Typography variant="body2">
          {`Comments: ${task.comments}`}
        </Typography>
      </CardContent>
    </Card>
  );
});