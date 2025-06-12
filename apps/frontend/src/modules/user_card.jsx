import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import Image from "next/image";
import beach from "../../public/images/beach.jpeg"
import Popover from "@/components/popover";
import { EllipsisHorizontalIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@heroui/button";

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
      <CardHeader className="p-0 h-32">
        <Image src={beach.src} priority height={100} width={100} alt="beach" className="object-cover w-full absolute" />

        <Popover
          placement="right-start"
          triggerComponent={(
            <Button className="absolute right-0 top-0" isIconOnly variant="light" radius="full" size="sm">
              <EllipsisHorizontalIcon className="size-5 text-background" />
            </Button>
          )} 
          items={items}
        />
      </CardHeader>

      <CardFooter className="flex flex-col my-3">
        <h1 className="font-bold text-medium">{user.fullName}</h1>
        <span className="text-sm">{user.email}</span>
      </CardFooter>
    </Card>
  )
}

export default UserCard;