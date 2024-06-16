import { Box, Grid, GridItem } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export const Layout = () => {
  return (
    <Box p={8} h={'100vh'} bg="#EEE">
      <Grid templateColumns={'300px 1fr'} gap={6} h={'100%'}>
        <GridItem>
          <Sidebar />
        </GridItem>

        <GridItem>
          <Box boxShadow="base" p={6} h="100%" rounded="20px" bg="white">
            <Outlet />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};
