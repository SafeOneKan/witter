import InfiniteScroll from "react-infinite-scroll-component";
import { twet } from "../../app/lib/types";
import TweetCard from "../clientComps/TweetCard";

type Props = {
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean;
  fetchNextPage: () => Promise<unknown>;
  tweets: twet[];
};

const InfiniteFeed = (props: Props) => {
  if (props.isLoading) return <div>Loading...</div>;
  if (props.isError) return <div>Error...</div>;
  if (props.tweets === null || props.tweets.length === 0)
    return <div>No tweets</div>;

  return (
    <>
      <InfiniteScroll
        endMessage={<div>No more tweets</div>}
        dataLength={props.tweets.length}
        next={props.fetchNextPage}
        hasMore={props.hasMore}
        loader={<div>Loading...</div>}
      >
        {props.tweets.map((tweet) => {
          return <TweetCard {...tweet} key={tweet.id} />;
        })}
      </InfiniteScroll>
    </>
  );
};

export default InfiniteFeed;
