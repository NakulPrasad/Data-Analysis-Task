import * as React from 'react';
import CustomTable from '../../components/Table';

export interface IHomeProps {
}

export default function Home (props: IHomeProps) {
  return (
    <div>
      <CustomTable/>
    </div>
  );
}
