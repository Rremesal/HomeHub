
import Skeleton from "@/components/skeleton";
import DefaultLayout from "../default.layout";
import { Card } from "@heroui/card";

function UserOverviewSkeleton() {
  return (
    <DefaultLayout>
      <div className="flex justify-between items-center">
        <Skeleton  className="h-9 w-80" />

        <Skeleton className="h-9 w-40" />
      </div>

      <div className=" my-5 flex flex-wrap gap-3">
          {Array(8).fill(null).map(item => (
            <Skeleton className="h-[100px] w-[350px] rounded-md"  />
          ))}
      </div>
    </DefaultLayout>
  )
}

export default UserOverviewSkeleton;
