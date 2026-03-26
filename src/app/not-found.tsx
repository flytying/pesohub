import Link from "next/link";
import { Calculator, TrendingUp, BookOpen } from "lucide-react";
import { buttonVariants } from "@/lib/button-variants";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 text-center">
      <h1 className="text-6xl font-bold text-gray-400">404</h1>
      <h2 className="mt-4 text-[32px] font-medium leading-[48px] text-gray-500">Page Not Found</h2>
      <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/" className={buttonVariants()}>
          Go Home
        </Link>
        <Link href="/calculators" className={buttonVariants({ variant: "outline" })}>
          <Calculator className="mr-2 h-4 w-4" />
          Calculators
        </Link>
        <Link href="/rates" className={buttonVariants({ variant: "outline" })}>
          <TrendingUp className="mr-2 h-4 w-4" />
          Rates
        </Link>
        <Link href="/guides" className={buttonVariants({ variant: "outline" })}>
          <BookOpen className="mr-2 h-4 w-4" />
          Guides
        </Link>
      </div>
    </div>
  );
}
