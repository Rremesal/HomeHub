import { format } from "date-fns";

// Core
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import Icon from "@/components/icon";
import Popover from "@/components/popover";


function UserCard(props) {
  const { user, onDelete, ...rest } = props;

  return (
    <Card {...rest} className="min-w-[300px]">
      <CardHeader className="flex gap-1 justify-between">
        <div>
          <h3 className="font-bold">{user?.full_name}</h3>
          { <p className="text-sm italic">{user?.last_logged_in_at ? format(new Date(user?.last_logged_in_at), "PPPpp") : "Has not logged in yet"}</p>}
        </div>

        <Popover
          placement="right-start"
          trigger={(
            <Button size="sm" isIconOnly className=" self-start">
              <Icon name="elipsisHorizontal" className="size-5" />
            </Button>
          )}
        >
          <ul>
            <li>
              <Button fullWidth size="sm" variant="light">Edit</Button>
            </li>
            <li>
              <Button fullWidth size="sm" variant="light">Reset password</Button>
            </li>
            <li>
              <Button onPress={onDelete} fullWidth size="sm" color="danger" variant="light">Delete</Button>
            </li>
          </ul>
        </Popover>
      </CardHeader>

      <CardBody>

      </CardBody>
    </Card>
  )
}

export default UserCard;