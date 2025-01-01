import { Container, Table, useMantineTheme } from "@mantine/core";
import CropData from "../../utlls/CropData.json";
import useCropData from "../../hooks/useCropData";

export interface ICustomTableProps {}

export default function CustomTable(props: ICustomTableProps) {
  const {yearGroups} =useCropData();
  const theme = useMantineTheme();

  // Step 1: Normalize CropData
  // const normalizedData = CropData.map((entry) => ({
  //   ...entry,
  //   Year: parseInt(entry.Year.match(/\d{4}/)?.[0] || "0", 10), // Extract year as number
  //   "Crop Production (UOM:t(Tonnes))":
  //     entry["Crop Production (UOM:t(Tonnes))"] === "" ||
  //     entry["Crop Production (UOM:t(Tonnes))"] == null
  //       ? 0
  //       : +entry["Crop Production (UOM:t(Tonnes))"],
  // }));

  // // Step 2: Group by year and find max and min crops
  // const yearGroups = normalizedData.reduce((acc, entry) => {
  //   const year = entry.Year;
  //   const production = entry["Crop Production (UOM:t(Tonnes))"];

  //   if (!acc[year]) {
  //     acc[year] = {
  //       maxCrop: entry,
  //       minCrop: entry,
  //     };
  //   } else {
  //     if (production > acc[year].maxCrop["Crop Production (UOM:t(Tonnes))"]) {
  //       acc[year].maxCrop = entry;
  //     }
  //     if (production < acc[year].minCrop["Crop Production (UOM:t(Tonnes))"]) {
  //       acc[year].minCrop = entry;
  //     }
  //   }

  //   return acc;
  // }, {});

  // // Step 3: Convert results into an array
  // const results = Object.entries(yearGroups).map(
  //   ([year, { maxCrop, minCrop }]) => ({
  //     Year: +year,
  //     "Max Crop Name": maxCrop["Crop Name"],
  //     "Max Production (t)": maxCrop["Crop Production (UOM:t(Tonnes))"],
  //     "Min Crop Name": minCrop["Crop Name"],
  //     "Min Production (t)": minCrop["Crop Production (UOM:t(Tonnes))"],
  //   })
  // );

  // console.table(results);

  const rows = yearGroups.map((element) => (
    <Table.Tr key={element.Year}>
      <Table.Td>{element.Year}</Table.Td>
      <Table.Td>{element["Max Crop Name"]}</Table.Td>
      <Table.Td>{element["Min Crop Name"]}</Table.Td>
    </Table.Tr>
  ));
  return (
    <Container mah={theme.other.containerHeights.sm}>
      <Table>
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
