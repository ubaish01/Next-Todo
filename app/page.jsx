import Form from "./AddTodoForm";
import { Suspense } from "react";
import Todos from "./todos"

export default function Home() {
  return (
    <div className="container" >
      <Form />
      <section className="todosContainer">

        <Suspense fallback={<div>loading...</div>}>

          <Todos />

        </Suspense>

      </section>
    </div>
  );
}
