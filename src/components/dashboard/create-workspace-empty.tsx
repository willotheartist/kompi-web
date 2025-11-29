"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreateWorkspaceModal } from "@/components/workspaces/create-workspace-modal";

const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

const container = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.1,
      ease: easing,
      when: "beforeChildren",
      staggerChildren: 0.14,
      delayChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: easing,
    },
  },
};

export function CreateWorkspaceEmpty() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <motion.div
          className="w-full max-w-3xl"
          initial="hidden"
          animate="show"
          variants={container}
        >
          <Card
            className="relative mx-auto flex flex-col gap-8 overflow-hidden rounded-[32px] border-none bg-[#E8F739] text-[#E55B1A] shadow-[0_22px_70px_rgba(0,0,0,0.16)] sm:flex-row sm:items-stretch sm:gap-10"
          >
            {/* subtle glossy overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-soft-light" />

            {/* LEFT: image */}
            <motion.div
              className="relative flex flex-1 items-center justify-center bg-transparent px-8 pt-8 sm:px-8 sm:py-10"
              variants={item}
            >
              <div className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[380px]">
                <div className="absolute -inset-4 rounded-[36px] bg-white/40 blur-3xl" />
                <Image
                  src="/kompi-business.png"
                  alt="Kompi workspace"
                  width={960}
                  height={720}
                  priority
                  className="relative z-[1] h-auto w-full"
                />
              </div>
            </motion.div>

            {/* RIGHT: copy + CTA */}
            <motion.div
              className="flex flex-1 flex-col justify-center px-8 pb-8 pt-0 sm:px-8 sm:py-10"
              variants={item}
            >
              <motion.p
                className="text-[11px] font-semibold uppercase tracking-[0.22em]"
                variants={item}
              >
                Workspaces
              </motion.p>

              <motion.h2
                className="mt-3 text-[26px] font-semibold leading-[1.05]
                           sm:text-[30px]
                           md:text-[34px]"
                style={{ letterSpacing: "-0.04em" }}
                variants={item}
              >
                Create a workspace
                <br />
                and run it from{" "}
                <span className="wf-serif-accent italic">Kompi</span>.
              </motion.h2>

              <motion.p
                className="mt-4 text-[14px] leading-[1.7]"
                variants={item}
              >
                Keep links, Kompi Codes™ and analytics organised by brand, client
                or team — so everything important lives in one clean workspace.
              </motion.p>

              <motion.p
                className="mt-2 text-[13px] leading-[1.7]"
                variants={item}
              >
                Track performance, share campaigns and collaborate with your
                team without switching tools.
              </motion.p>

              <motion.p
                className="mt-3 text-[12px] leading-[1.7] opacity-80"
                variants={item}
              >
                Start with one workspace. Add more as your business grows.
              </motion.p>

              <motion.div
                className="mt-7 flex flex-wrap items-center gap-4"
                variants={item}
              >
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center justify-center rounded-full bg-[#E55B1A] px-9 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-95 active:translate-y-[1px]"
                >
                  Create workspace
                </button>

                <Button
                  type="button"
                  variant="ghost"
                  className="h-auto px-0 py-0 text-sm font-medium underline-offset-4 hover:bg-transparent hover:underline"
                >
                  Learn how teams use workspaces
                </Button>
              </motion.div>
            </motion.div>
          </Card>
        </motion.div>
      </div>

      <CreateWorkspaceModal open={open} onOpenChange={setOpen} />
    </>
  );
}
