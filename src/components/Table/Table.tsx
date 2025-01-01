import { Container, Table, useMantineTheme } from "@mantine/core";
import useCropData from "../../hooks/useCropData";

export interface ICustomTableProps {}

export default function CustomTable() {
  const { yearGroups } = useCropData();
  const theme = useMantineTheme();

  const rows = yearGroups.map((element) => (
    <Table.Tr key={element.Year}>
      <Table.Td>{element.Year}</Table.Td>
      <Table.Td>{element["Max Crop Name"]}</Table.Td>
      <Table.Td>{element["Min Crop Name"]}</Table.Td>
    </Table.Tr>
  ));
  return (
    <Container mah={theme.other.containerHeights.sm}>
      <Table
        striped
        highlightOnHover
        withTableBorder
        stickyHeader
        stickyHeaderOffset={-20}
        horizontalSpacing="md"
        verticalSpacing="md"
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Year</Table.Th>
            <Table.Th>Crop with Maximum Production in that Year</Table.Th>
            <Table.Th>Crop with Minimum Production in that Year</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Container>
  );
}
