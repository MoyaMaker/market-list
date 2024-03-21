"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { LoaderCircleIcon } from "lucide-react";

import { Button } from "@/lib/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";

export default function Login() {
  const { data, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, status]);

  return (
    <main className="container">
      <Card className="mx-auto max-w-xs mt-40">
        <CardHeader>
          <CardTitle className="text-2xl">Bienvenido</CardTitle>
          <CardDescription>Acceso limitado</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-end">
          {status === "authenticated" && (
            <Button asChild>
              <Link href="/">Ir al inicio</Link>
            </Button>
          )}
          {status === "loading" && (
            <Button disabled>
              <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
              Cargando
            </Button>
          )}
          {status === "unauthenticated" && (
            <Button
              variant="secondary"
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/",
                  redirect: true,
                })
              }
            >
              <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                <path
                  fill="currentColor"
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                />
              </svg>
              Google
            </Button>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
