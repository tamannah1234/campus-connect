"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

/**
 * Fixed sizes – DO NOT use h-full / w-full here
 * Avatar ROOT controls everything
 */
const avatarSizes = {
  sm: "h-7 w-7",        // sidebar users
  default: "h-6 w-6",   // headers / profile
  lg: "h-11 w-11",      // profile pages
};

function Avatar({
  className,
  size = "default",
  ...props
}: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
  size?: keyof typeof avatarSizes;
}) {
  return (
    <AvatarPrimitive.Root
      className={cn(
        "relative flex-none shrink-0 overflow-hidden rounded-full",
        "bg-muted", // prevents white flash
        avatarSizes[size],
        className
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      className={cn(
        "h-full w-full object-cover",
        "block" // IMPORTANT: removes inline-image gaps
      )}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        "flex h-full w-full items-center justify-center",
        "rounded-full bg-slate-200 text-slate-600",
        "text-xs font-semibold uppercase",
        className
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };