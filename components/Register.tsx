"use client";
import { FcGoogle } from "react-icons/fc";
import sign from "@/styles/signIn/sign.module.scss";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Register_cred } from "@/app/lib/register";
import React, { useRef, useState } from "react";
import type { ZodError } from "zod";
import { z } from "zod";
import { redirect, useRouter } from "next/navigation";
export interface RegisterProps {
  login?: boolean;
}

const Userschema = z.object({
  username: z.string().min(3, "must be at least 3 characters").nullish(),
  email: z.string().email(),
  password: z.string().min(5, "must be at least 5 characters"),
});

const Register: React.FC<RegisterProps> = ({ login = false }) => {
  const [formError, setFormError] = useState<ZodError | Error | null>(null);
  const [zoderr, setZoderr] = useState<any>(null);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const Login_cred = async (data: FormData) => {
    const email = data.get("email")?.valueOf() as string;
    const password = data.get("password")?.valueOf() as string;
    const dt = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (dt?.error) {
      throw new Error(dt.error);
    }
    return router.push("/private");
  };

  const handle = async (data: FormData) => {
    const { username, email, password } = Object.fromEntries(data);
    const err = Userschema.safeParse({
      username,
      email,
      password,
    });
    if (!err.success) {
      setZoderr(err.error.format());
      return;
    }
    setZoderr(null);
    try {
      if (!login) {
        await Register_cred(data);
        const dt = await signIn("credentials", {
          email: email,
          password: password,
          redirect: false,
        });
        if (!dt?.error) router.push("/private");
        setFormError(null);
      } else if (login) {
        await Login_cred(data);
        setFormError(null);
      }
    } catch (err: any) {
      setFormError(err);
    } finally {
      formRef.current?.reset();
    }
  };

  return (
    <div
      className={`${sign.signs} self-center phone:h-screen phone:w-screen phone:dark:bg-slate-700  p-12 flex flex-col justify-center content-center
       
       `}
    >
      <h1 className="text-3xl  font-bold">{login ? "Login" : "Register"}</h1>
      <form ref={formRef} action={handle} className={`${sign.form} `}>
        {!login && (
          <>
            <input
              type="text"
              placeholder="UserName"
              name="username"
              id="username"
              required
            />
            {zoderr && (
              <div className="text-red-500">
                {zoderr?.username?._errors.join(", ")}
              </div>
            )}
            {login && formError && (
              <div className="text-red-500">{formError.message}</div>
            )}
          </>
        )}

        <input
          type="email"
          required
          placeholder="Email"
          name="email"
          id="email"
        />
        {zoderr && (
          <div className="text-red-500">
            {zoderr?.email?._errors.join(", ")}
          </div>
        )}
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required
        />
        {zoderr && (
          <div className="text-red-500">
            {zoderr?.password?._errors.join(", ")}
          </div>
        )}
        {formError && <div className="text-red-500">{formError.message}</div>}
        <SubmitButton login={login} />
      </form>

      <div className={sign.or}>or</div>
      <button
        onClick={() => signIn("google")}
        className={`${sign.google} dark:text-slate-900`}
      >
        <FcGoogle size={20} />
        <span>Sign in with Google</span>
      </button>
      {!login ? (
        <span className="pt-4">
          Already have an account !{"  "}
          <Link className={sign.link} href="/login">
            Login
          </Link>
        </span>
      ) : (
        <span className="pt-4">
          dont have an account yet !{"  "}
          <Link className={sign.link} href="/signin">
            Sign Up
          </Link>
        </span>
      )}
    </div>
  );
};

const SubmitButton = ({ login }: { login: boolean }) => {
  const data = useFormStatus();
  const isLoading = data.pending;
  return (
    <button
      className="disabled:opacity-50 dark:text-slate-900"
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : login ? "Sign in" : "Sign Up"}
    </button>
  );
};

export default Register;
