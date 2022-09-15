import React, { memo, useCallback, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Col, Row } from 'antd';
import { useAppDispatch } from '../app/hooks';
import { setRepositoryLink } from '../features/repositiryLinkSlice';
import { formatLink } from '../utils/formatLink';

export const LinkInput: React.FC = memo(() => {
  const [link, setLink] = useState('');

  const dispatch = useAppDispatch();

  const loadIssues = useCallback(() => {
    const formatedLink = formatLink(link);

    dispatch(setRepositoryLink(formatedLink));

    setLink('');
  }, [link, formatLink]);

  return (
    <Row gutter={12}>
      <Col span={8}>
        <TextField 
          id="input" 
          label="Enter repo URL" 
          variant="outlined"
          size="small"
          fullWidth
          value={link}
          onChange={(event) => setLink(event.target.value)}
        />
      </Col>
      <Col span={8}>
        <Button 
          variant="contained" 
          size="large"
          onClick={loadIssues}
        >
          Load issues
        </Button>
      </Col>
    </Row>
  );
});
