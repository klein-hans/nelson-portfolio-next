import { Navbar, Footer } from "components/molecules";

export function Landing({ page, children }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-800">
      <main className="bg-transparent relative h-screen w-full">
        <Navbar />
        <div className="bg-white dark:bg-gradient-to-bl dark:from-neutral-700 dark:via-neutral-900 dark:to-neutral-900">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
}
