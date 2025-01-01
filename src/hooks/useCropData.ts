import { useMemo } from "react";
import CropData from "../utlls/CropData.json";

// Custom hook to process crop data
const useCropData = () => {
  // Normalize CropData: Convert year to a number and handle empty production values
  const normalizedData = useMemo(() => {
    if (!CropData) throw new Error("Crop Data is empty");
    const normalizedDataTemp = CropData.map((crop) => ({
      ...crop,
      Year: parseInt(crop.Year.match(/\d{4}/)?.[0] || "0", 10), // Extract year as a number
      "Crop Production (UOM:t(Tonnes))":
        crop["Crop Production (UOM:t(Tonnes))"] === "" ||
        crop["Crop Production (UOM:t(Tonnes))"] == null
          ? 0
          : +crop["Crop Production (UOM:t(Tonnes))"], // Default empty/null to 0
    }));
    return normalizedDataTemp;
  }, [CropData]);

  // Group data by year and find crops with max/min production
  const yearGroups = useMemo(() => {
    if (normalizedData.length === 0) throw new Error("Normalized Data is empty");
    const yearGroupsTemp = normalizedData.reduce((acc, current) => {
      const year = current.Year;
      const production = current["Crop Production (UOM:t(Tonnes))"];

      // Initialize year group if it doesn't exist
      if (!acc[year]) {
        acc[year] = {
          maxCrop: current,
          minCrop: current,
        };
      } else {
        // Update max/min crop for the year
        if (production > acc[year].maxCrop["Crop Production (UOM:t(Tonnes))"]) {
          acc[year].maxCrop = current;
        }
        if (production < acc[year].minCrop["Crop Production (UOM:t(Tonnes))"]) {
          acc[year].minCrop = current;
        }
      }

      return acc;
    }, {});

    // Convert aggregated data into an array of objects
    return Object.entries(yearGroupsTemp).map(
      ([year, { maxCrop, minCrop }]) => ({
        Year: +year,
        "Max Crop Name": maxCrop["Crop Name"], // Crop with max production
        "Min Crop Name": minCrop["Crop Name"], // Crop with min production
      })
    );
  }, [normalizedData]);

  // Aggregate data for bar chart: Calculate average yield per crop
  const barChartData = useMemo(() => {
    if (normalizedData.length === 0) return [];
    const cropGroups = normalizedData.reduce(
      (acc, current) => {
        const cropName = current["Crop Name"];
        const production = current["Crop Production (UOM:t(Tonnes))"];

        // Initialize crop group if it doesn't exist
        if (!acc[cropName]) {
          acc[cropName] = { totalYield: 0, count: 0 };
        }

        // Accumulate total yield and count
        acc[cropName].totalYield += production;
        acc[cropName].count += 1;

        return acc;
      },
      {} as Record<string, { totalYield: number; count: number }>
    );

    // Calculate average yield for each crop
    return Object.entries(cropGroups).map(
      ([cropName, { totalYield, count }]) => ({
        cropName,
        averageYield: totalYield / count,
      })
    );
  }, [normalizedData]);

  return { yearGroups, normalizedData, barChartData };
};

export default useCropData;
