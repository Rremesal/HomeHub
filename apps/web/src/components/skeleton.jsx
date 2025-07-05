// Core 
import { Skeleton as HeroSkeleton } from "@heroui/skeleton";

function Skeleton(props) {
  const { className } = props;
  return (
    <HeroSkeleton className={className}>
      <div className="w-full h-full" />
    </HeroSkeleton>
  )
}

export default Skeleton;

