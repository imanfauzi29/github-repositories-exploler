import { StarIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Flex,
  HStack,
  Spinner,
  Text,
  VStack,
  useBoolean
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { Repository, setUsers } from "../store/reducers/userSlicer";
import { Octokit } from "octokit";
import { useCallback, useState } from "react";

const ListUsers = (): JSX.Element => {
  const [errorRepo, setErrorRepo] = useState<string>();
  const [loading, setLoading] = useBoolean();

  const { users, error } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const getRepoByUser = async (user: string) => {
    try {
      const oktokit = new Octokit({
        auth: process.env.REACT_APP_GITHUB_TOKEN
      });

      const repos = await oktokit
        .request("GET /users/{username}/repos", { username: user })
        .then((res) => res.data);

      if (!repos.length) throw new Error("Data not found!");

      const repoDetail: Repository[] = repos.map((repo) => ({
        repository_name: repo.name,
        description: repo.description,
        rating: repo.stargazers_count
      }));

      setLoading.off();
      dispatch(setUsers({ ...users, [user]: repoDetail }));
    } catch (error: any) {
      setLoading.off();
      setErrorRepo(error.message);
    }
  };

  const accordionCollapse = useCallback((index: number) => {
    setLoading.on();
    setErrorRepo("");
    const getIndexUsers = Object.keys(users)[index];
    getRepoByUser(getIndexUsers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error)
    return (
      <Flex w={"full"} justifyContent={"center"}>
        <Text>{error}</Text>
      </Flex>
    );

  return (
    <Box>
      <Accordion onChange={accordionCollapse} allowToggle>
        {Object.keys(users).map((user, i) => (
          <AccordionItem key={i}>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  {user}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {loading && (
                <Flex w={"full"} justifyContent={"center"}>
                  <Spinner />
                </Flex>
              )}
              {errorRepo && (
                <Flex w={"full"} justifyContent={"center"}>
                  <Text color={"blackAlpha.400"}>{errorRepo}</Text>
                </Flex>
              )}

              {!errorRepo && !loading
                ? users[user].map((repo, j) => (
                    <Box p={5} mb={10} minHeight={150} shadow="md" key={j}>
                      <Container maxW={"container.xl"}>
                        <HStack
                          align={"stretch"}
                          justifyContent={"space-between"}>
                          <Box>
                            <VStack spacing={4} align={"stretch"}>
                              <Text fontWeight={"bold"}>
                                {repo.repository_name}
                              </Text>
                              <Text>
                                {repo.description ?? "(No Description)"}
                              </Text>
                            </VStack>
                          </Box>
                          <Box>
                            <Flex alignItems={"center"}>
                              <Text>{repo.rating}</Text>
                              <StarIcon />
                            </Flex>
                          </Box>
                        </HStack>
                      </Container>
                    </Box>
                  ))
                : null}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

export default ListUsers;
