import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/modal";
import CreateUserForm from "@/components/forms/create_user.form";
import DefaultLayout from "@/components/layouts/default.layout";
import SearchInput from "@/components/search_input";
import UserCard from "@/modules/users/user_card";
import { deleteUser } from "@/mutations/user";
import { getUsers } from "@/queries/users";

// Hooks
import useQueryHelper from "@/hooks/query_helper";
import { Button } from "@heroui/button";
import Icon from "@/components/icon";
import UserOverviewSkeleton from "@/components/layouts/loaders/user_overview.skeleton";

function UsersPage() {
  const router = useRouter();
  const params = router.query;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users", params],
    queryFn: getUsers,
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["delete"],
    mutationFn: deleteUser
  });

  useEffect(() => {
    refetch();
  }, [params]);

  const { removeFromCache } = useQueryHelper();
  const { isOpen, onOpen, onOpenChange} = useDisclosure();

  const handleDelete = async (id) => {
    try {
      removeFromCache(["users", params], id)
      await mutateAsync(id);
    } catch (error) {
      throw error;
    }
  }

  if (isLoading) return <UserOverviewSkeleton />;

  return (
    <DefaultLayout>
      <div className="flex justify-between items-center">
        <SearchInput className="w-[400px]" />

        <Button onPress={onOpen} color="primary" size="sm" startContent={<Icon name="plus" />}>
          New user
        </Button>
      </div>

      <section className=" mt-5 flex flex-wrap gap-2">
        {data?.map(user => (
          <UserCard key={user._id} onDelete={() => handleDelete(user._id)} user={user} />
        ))}
      </section>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="text-foreground">
          <ModalHeader>
            Creating new user
          </ModalHeader>

          <ModalBody>
            <CreateUserForm onSubmit={onOpenChange} />
          </ModalBody>
        </ModalContent>
      </Modal>

    </DefaultLayout>
  )
}

export default UsersPage;
