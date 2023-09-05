"use client";
import { useInfiniteQuery } from "@tanstack/react-query";

import { getTweets } from "@/app/lib/TweetsManager";
import { useCallback, useEffect, useRef } from "react";
import TweetCard from "../clientComps/TweetCard";
import InfiniteFeed from "./InfiniteFeed";

const PostFeed = () => {
  const lastref = useRef<HTMLElement>();

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          query.fetchNextPage();
        }
      },
      {
        threshold: 0.8,
      }
    );
  }, []);

  useEffect(() => {}, [lastref]);

  return (
    // <div>
    //   <ul>
    //     {query.data?.pages.flatMap((page, i) =>
    //       page.data.map((tweet) => <TweetCard key={tweet.id} {...tweet} />)
    //     )}
    //   </ul>

    //   {query.hasNextPage && (
    //     <button onClick={() => query.fetchNextPage()}>Load more</button>
    //   )}
    // </div>
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
