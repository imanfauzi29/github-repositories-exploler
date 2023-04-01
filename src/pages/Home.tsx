import { Box, Flex, Spinner, VStack } from "@chakra-ui/react";
import ListUsers from "../components/ListUsers";
import SearchBox from "../components/SearchBox";
import { useAppSelector } from "../hooks/reduxHooks";

const Home = (): JSX.Element => {
  const { isLoading } = useAppSelector((state) => state.users);

  return (
    <Box m={[5, 10]}>
      <VStack spacing={4} align={"stretch"}>
        <SearchBox />
        {isLoading ? (
          <Flex w={"full"} justifyContent={"center"}>
            <Spinner />
          </Flex>
        ) : (
          <ListUsers />
        )}
      </VStack>
    </Box>
  );
};

export default Home;
