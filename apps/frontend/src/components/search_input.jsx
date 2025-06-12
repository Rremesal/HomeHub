import { Input } from "@heroui/input";


//Icons
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Button } from "@heroui/button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function SearchInput() {
  const router = useRouter();
  const params = router.query;
  const [searchValue, setSearchValue] = useState(params.s || "");



  useEffect(() => {
    if (params.s === "") {
      router.push({ query: {}})
    }
    console.log(params)
  }, [params]);

  const search = (query) => {
    router.push({ query: {
      s: query
    }});
  }

  const handleSearch = event => {
    search(event.target.value);
  }

  const handleEnter = event => {
    if (event.key === "Enter") {
      search(event.target.value)
    }
  }

  const handleChange = event => {
    setSearchValue(event.target.value)
  }

  return (
    <Input 
      endContent={(
        <Button className="absolute right-0 top-0" isIconOnly variant="light" size="sm" onPress={handleSearch}>
          <MagnifyingGlassIcon className="size-5 text-background dark:text-white" />
        </Button>
      )} 
      onChange={handleChange}
      onKeyDown={handleEnter}
      value={searchValue} 
      size="sm" 
      name="search" 
    />
  )
}

export default SearchInput;