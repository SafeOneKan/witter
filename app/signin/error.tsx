"use client";

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div>
      <div>Error a tbi</div>
      <div>{error.message} </div>
      <button onClick={() => reset()}>reset</button>
    </div>
  );
};

export default error;
