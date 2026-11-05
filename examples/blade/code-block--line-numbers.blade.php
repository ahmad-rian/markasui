@php
    $code = <<<'CODE'
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  const add = () => setCount(count + 1);

  return (
    <button onClick={add}>
      Clicked {count} times
    </button>
  );
}
CODE;
@endphp

<x-markas.code-block :code="$code" title="Counter.tsx" show-line-numbers />
