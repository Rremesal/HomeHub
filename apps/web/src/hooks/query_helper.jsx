import { useQueryClient } from "@tanstack/react-query";

const useQueryHelper = () => {
  const queryClient = useQueryClient();

  const removeFromCache = (queryKeys, userId) => {
    queryClient.setQueryData(queryKeys, (oldData) => {
      if (!oldData) return oldData;
      return oldData.filter(dbUser => dbUser._id !== userId);
    });
  }

  const invalidateQuery = (queryKeys) => {
    queryClient.invalidateQueries(queryKeys);
  }



  return {
    removeFromCache,
    invalidateQuery
  }
}

export default useQueryHelper;
