import { Box, Title, Text } from '@mantine/core';
import * as React from 'react';
import { useRouteError } from 'react-router-dom';

export interface IErrorProps {
}

interface error{
    message : string,
    statusText : string,
}

export default function ErrorPage (props: IErrorProps) {
    const error : error | any = useRouteError();
    console.error(error);
  return (
    
      <Box id="error-page">
      <Title order={1}>Oops!</Title>
      <Text>Sorry, an unexpected error has occurred.</Text>
      <Text>
        {error.statusText || error.message}
      </Text>
    </Box>
    
  );
}
