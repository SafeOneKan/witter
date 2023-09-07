import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCustomMutation = (
  mutationKey: string,
  fn: () => Promise<unknown>,
  query_invalidate: string
) => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationKey: [mutationKey],
    mutationFn: fn,
    onSuccess: () => {
      queryclient.invalidateQueries([query_invalidate]);
    },
  });
};
