"use client";
import { useEffect, useState, useTransition } from "react";
import Link from "next/link";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [serverMessage, setServerMessage] = useState<string>("");
  const [_isPending, startTransition] = useTransition();

  const getHelloWorld = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/hello");
      const result = await response.json();
      console.log("result", result);
      setServerMessage(result.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("error", error);
      return error;
    }
  };

  useEffect(() => {
    // React 18 idiomatic way to set state in a useEffect
    startTransition(() => {
      getHelloWorld();
    });
  }, []);

  return (
    <div>
      <main>
        <div>Hello!</div>
        <div>
          {loading ? <div>Loading...</div> : <div>{serverMessage}</div>}
        </div>
        <div>
          <Link href="/child" style={{ textDecoration: "underline" }}>
            Child Page
          </Link>
        </div>
      </main>
    </div>
  );
}
