import { Container, Flex, Title } from "@mantine/core";

export interface IHeaderProps {}

export default function Header() {
  return (
    <Container>
      <Flex>
        <Title order={2}>Data Analysis</Title>
      </Flex>
    </Container>
  );
}
