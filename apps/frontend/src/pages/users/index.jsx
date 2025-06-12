import DefaultLayout from "@/components/layouts/default.layout";
import { getUsers } from "@/queries";
import { Button } from "@heroui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { deleteUser } from "@/mutations/user";
import UserCard from "@/modules/user_card";
import SearchInput from "@/components/search_input";
import { useRouter } from "next/router";



function UsersPage() {
  const router = useRouter();
  const params = router.query;

  const queryClient = useQueryClient();
  const { data: users, isLoading } = useQuery({
    queryKey: ["users", params],
    queryFn: getUsers,
  });

  const mutation = useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", params]})
    }
  });

  if (isLoading) return "Loading..."

  return (
    <DefaultLayout>
      <div>
        <div className="flex flex-row justify-between items-center mb-11">
          <div className="w-[350px]">
            <SearchInput />
          </div>
          <Button 
            as={Link} 
            href="/users/create" 
            size="sm" 
            color="primary"
          >
            Create new user
          </Button>
        </div>

        <div className="flex flex-wrap gap-3">
          {users.map(user => (
            <UserCard key={user._id} user={user} mutation={mutation} />
          ))}
        </div>
      </div>
    </DefaultLayout>
  )
}

export default UsersPage;