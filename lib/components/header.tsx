import { getServerSession } from "next-auth";

import { CartList } from "./cart-list";
import { ThemeToggle } from "./theme-toggle";

export async function Header() {
  const session = await getServerSession();

  return (
    <header className="container py-2 backdrop-blur-md flex justify-end gap-2 sticky top-0">
      <ThemeToggle />

      {session && <CartList />}
    </header>
  );
}
