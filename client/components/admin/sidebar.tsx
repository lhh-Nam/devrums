import { useState } from "react";
import { Button } from "@nextui-org/button";

export const Sidebar = () => {
  const [count, setCount] = useState(0);

  return (
    <Button radius="full" onPress={() => setCount(count + 1)}>
      Count is {count}
    </Button>
  );
};
