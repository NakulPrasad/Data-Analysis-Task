import CustomTable from '../../components/Table/Table';
import CustomBarChart from '../../components/BarChart/CustomBarChart';

export interface IHomeProps {
}

export default function Home (props: IHomeProps) {
  return (
    <div>
      <CustomTable/>
      <CustomBarChart/>
    </div>
  );
}
