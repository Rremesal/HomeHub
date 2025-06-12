import { Card, CardFooter, CardHeader } from "@heroui/card";
import Popover from "@/components/popover";
import { EllipsisHorizontalIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
import { format } from "date-fns";

function UserCard(props) {
  const { user, mutation, ...rest } = props;

    const handleDeleteUser = async id => {
    try {
      await mutation.mutateAsync(id)
    } catch (error) {
      console.log("delete error", error)
    }
  }

  const items = [
    {
      icon: <PencilSquareIcon className="size-5" />,
      content: "Edit"
    },
    {
      icon: <TrashIcon className="size-5" />,
      content: "Delete",
      danger: true,
      onClick: () => handleDeleteUser(user._id)
    }, 
  ];

  return (
    <Card {...rest} className="w-60 h-80">
      <CardHeader className="flex justify-center mt-10">
        <Popover
          placement="right-start"
          triggerComponent={(
            <Button className="absolute right-0 top-0" isIconOnly variant="light" radius="full" size="sm">
              <EllipsisHorizontalIcon className="size-5" />
            </Button>
          )} 
          items={items}
        />

        <Avatar name={user.fullName} size="lg" />
      </CardHeader>

      <CardFooter className="flex flex-col my-3">
        <h1 className="font-bold text-medium">{user.fullName}</h1>
        <span className="text-sm">{format(new Date(user.last_login_at), "PPPpp")}</span>
      </CardFooter>
    </Card>
  )
}

export default UserCard;