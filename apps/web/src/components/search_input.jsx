import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Core
import { Input } from "@heroui/input";
import Icon from "./icon";

function SearchInput(props) {
  const { className } = props;

  const [value, setValue] = useState("");
  const router = useRouter();

  const params = router.query;

  useEffect(() => {
    setValue(params.s)
  }, [params.s])

  const handleChange = event => {
    setValue(event.target.value);
  }

  const handleSearch = () => {
    router.push({ query: {
      s: value
    }});
  }

  const handleEnter = event => {
    if (event.key === "Enter") {
      router.push({ query: {
        s: value
      }});
    }
  }

  return (
    <Input
      size="sm"
      className={className}
      value={value || ""}
      onChange={handleChange}
      onKeyDown={handleEnter}
      endContent={<Icon className="hover:cursor-pointer hover:text-primary-500 text-white" name="magnifyingGlass" onClick={handleSearch} />}
    />
  )
}

export default SearchInput;

