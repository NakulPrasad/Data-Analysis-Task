import { Box, Container, Title } from '@mantine/core';
import * as React from 'react';

export interface IHeaderProps {
}

export default function Header (props: IHeaderProps) {
  return (
    <Container>
      <Title order={1}>Data Analysis Task</Title>
    </Container>
  );
}
