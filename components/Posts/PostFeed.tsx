"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getTweets } from "@/app/lib/TweetsManager";
import InfiniteFeed from "./InfiniteFeed";

const PostFeed = () => {
  const query = useInfiniteQuery({
    queryKey: ["tweets"],
    queryFn: async ({ pageParam }) => {
      let { limit = 5, cursor = null } = pageParam || {};
      const data = await getTweets(limit, cursor);

      return data;
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.lastCursor?.created_at && !lastPage.lastCursor?.id) {
        return null;
      }
      return {
        cursor: lastPage.lastCursor,
      };
    },
  });

  return (
    <InfiniteFeed
      fetchNextPage={query.fetchNextPage}
      hasMore={!!query.hasNextPage}
      isError={query.isError}
      isLoading={query.isLoading}
      tweets={query.data?.pages.flatMap((page) => page.data) || []}
    />
  );
};
export default PostFeed;
