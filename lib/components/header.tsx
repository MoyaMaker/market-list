import { CartList } from "./cart-list";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="container py-2 backdrop-blur-md flex justify-end sticky top-0">
      <ThemeToggle />

      <CartList />
    </header>
  );
}
