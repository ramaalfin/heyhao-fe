import { useMutation } from "@tanstack/react-query";
import { createRoom } from "../api/createRoom";

export const useCreateRoom = () => {
  const { mutateAsync, isPending, error, isError } = useMutation({
    mutationFn: (data: { user_id: string }) => createRoom(data.user_id),
  });

  return {
    mutateAsync,
    isPending,
    error,
    isError,
  };
};
