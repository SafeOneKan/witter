"use client";
import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  return redirect("/signin");
};

export default page;
