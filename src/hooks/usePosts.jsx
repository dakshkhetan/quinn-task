import { useQuery } from "react-query";

import { fetchPosts } from "../utils/api";
import { parseFetchedData } from "../utils";

const queryOptions = {
  staleTime: 10 * 60 * 1000, // 10 mins
  cacheTime: 30 * 60 * 1000 // 30 mins
};

const usePosts = (continuationToken) => {
  const { data, error, isLoading, refetch } = useQuery(
    ["posts", continuationToken],
    () => fetchPosts(continuationToken),
    {
      ...queryOptions,
      select: (data) => parseFetchedData(data)
    }
  );

  return {
    data: { postsList: data?.posts || [], postsMap: data?.postsMap || null },
    continuationToken: data?.continuationToken || null,
    error,
    isLoading,
    refetch
  };
};

export default usePosts;
