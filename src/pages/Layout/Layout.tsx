import { Box } from "@mantine/core";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import classes from './Layout.module.css'

export interface IRootProps {
}

export default function Layout () {
  return (
    <Box className={classes.layout}>
      <Header/>
      <Outlet/>
    </Box>
  );
}
