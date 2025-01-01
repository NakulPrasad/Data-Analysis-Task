import { Box, Text, Title } from "@mantine/core";
import { useRouteError } from "react-router-dom";

export interface IErrorProps {}

interface error {
  message: string;
  statusText: string;
}

export default function ErrorPage() {
  const error: error | any = useRouteError();
  console.error(error);
  return (
    <Box id="error-page">
      <Title order={1}>Oops!</Title>
      <Text>Sorry, an unexpected error has occurred.</Text>
      <Text>{error.statusText || error.message}</Text>
    </Box>
  );
}
