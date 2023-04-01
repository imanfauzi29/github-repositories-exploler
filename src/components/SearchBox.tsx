import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
  Text
} from "@chakra-ui/react";
import { useAppDispatch } from "../hooks/reduxHooks";
import { Octokit } from "octokit";
import { useState } from "react";
import {
  Repository,
  User,
  setError,
  setIsLoading,
  setUsers
} from "../store/reducers/userSlicer";

const SearchBox = (): JSX.Element => {
  const [q, setQ] = useState<string>();
  const dispatch = useAppDispatch();

  const oktokit = new Octokit({
    auth: process.env.REACT_APP_GITHUB_TOKEN
  });

  const searchUser = async (name: string) => {
    dispatch(setIsLoading());
    try {
      const search = await oktokit
        .request("GET /search/users", {
          q: name
        })
        .then((res) => res.data.items);

      setQ(name);
      if (!search.length) throw new Error("Data not found!");

      const getOnlyLoginName: User[] = search.map((list) => ({
        [list.login]: [] as Repository[]
      }));

      dispatch(setUsers(Object.assign({}, ...getOnlyLoginName)));
      dispatch(setIsLoading());
    } catch (error: any) {
      dispatch(setIsLoading());

      dispatch(setError(error.message));
    }
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const target = e.target as typeof e.target & {
      q: { value: string };
    };

    searchUser(target.q.value);
  };

  return (
    <>
      <Box>
        <form onSubmit={handleSearch}>
          <Stack spacing={4} direction={["column", "row"]}>
            <FormControl>
              <Input type={"text"} name={"q"} placeholder={"Enter username"} />
              <FormErrorMessage>error message</FormErrorMessage>
            </FormControl>

            <Button type={"submit"} mt={4} colorScheme={"blue"}>
              Search
            </Button>
          </Stack>
        </form>
      </Box>

      {q && (
        <Box>
          <Text>Showing user for "{q}"</Text>
        </Box>
      )}
    </>
  );
};

export default SearchBox;
