import { useMemo } from "react";
import CropData from "../utlls/CropData.json";

interface IDataEntry {
  Year: string;
  "Crop Production (UOM:t(Tonnes))": string | null | undefined;
  "Crop Name": string;
  [key: string]: any; // For additional properties if necessary
}

interface ICropDataProps {
  data: IDataEntry[];
}

const useCropData = () => {
  const data: IDataEntry[] = CropData;
  const normalizedData = useMemo(() => {
    const normalizedDataTemp = data.map((entry) => ({
      ...entry,
      Year: parseInt(entry.Year.match(/\d{4}/)?.[0] || "0", 10), // Extract year as number
      "Crop Production (UOM:t(Tonnes))":
        entry["Crop Production (UOM:t(Tonnes))"] === "" ||
        entry["Crop Production (UOM:t(Tonnes))"] == null
          ? 0
          : +entry["Crop Production (UOM:t(Tonnes))"],
    }));
    return normalizedDataTemp;
  }, [data]);

  const yearGroups = useMemo(() => {
    const yearGroupsTemp = normalizedData.reduce((acc, entry) => {
      const year = entry.Year;
      const production = entry["Crop Production (UOM:t(Tonnes))"];

      if (!acc[year]) {
        acc[year] = {
          maxCrop: entry,
          minCrop: entry,
        };
      } else {
        if (production > acc[year].maxCrop["Crop Production (UOM:t(Tonnes))"]) {
          acc[year].maxCrop = entry;
        }
        if (production < acc[year].minCrop["Crop Production (UOM:t(Tonnes))"]) {
          acc[year].minCrop = entry;
        }
      }

      return acc;
    }, {});

    // Convert aggregated data into an array of objects
    return Object.entries(yearGroupsTemp).map(
      ([year, { maxCrop, minCrop }]) => ({
        Year: +year,
        "Max Crop Name": maxCrop["Crop Name"],
        "Max Production (t)": maxCrop["Crop Production (UOM:t(Tonnes))"],
        "Min Crop Name": minCrop["Crop Name"],
        "Min Production (t)": minCrop["Crop Production (UOM:t(Tonnes))"],
      })
    );
  }, [normalizedData]);

  const barChartData = useMemo(() => {
    if (normalizedData.length === 0) return [];
    const cropGroups = normalizedData.reduce((acc, entry) => {
      const cropName = entry["Crop Name"];
      const production = entry["Crop Production (UOM:t(Tonnes))"];

      if (!acc[cropName]) {
        acc[cropName] = { totalYield: 0, count: 0 };
      }

      acc[cropName].totalYield += production;
      acc[cropName].count += 1;

      return acc;
    }, {} as Record<string, { totalYield: number; count: number }>);

    return Object.entries(cropGroups).map(([cropName, { totalYield, count }]) => ({
      cropName,
      averageYield: totalYield / count,
    }));
  }, [normalizedData]);
  

  return { yearGroups, normalizedData, barChartData };
};

export default useCropData;
