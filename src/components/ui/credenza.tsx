// "use client"

// import * as React from "react"

// import { useMediaQuery } from "@/hooks/use-media-query"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer"
// import { DialogClose } from "@radix-ui/react-dialog"

// interface BaseProps {
//   children: React.ReactNode
// }

// interface RootCredenzaProps extends BaseProps {
//   open?: boolean
//   onOpenChange?: (open: boolean) => void
// }

// interface CredenzaProps extends BaseProps {
//   className?: string
//   asChild?: true
// }

// const desktop = "(min-width: 768px)"

// const Credenza = ({ children, ...props }: RootCredenzaProps) => {
//   const isDesktop = useMediaQuery(desktop)
//   const Credenza = isDesktop ? Dialog : Drawer

//   return <Credenza {...props}>{children}</Credenza>
// }

// const CredenzaTrigger = ({ className, children, ...props }: CredenzaProps) => {
//   const isDesktop = useMediaQuery(desktop)
//   const CredenzaTrigger = isDesktop ? DialogTrigger : DrawerTrigger

//   return (
//     <CredenzaTrigger className={className} {...props}>
//       {children}
//     </CredenzaTrigger>
//   )
// }

// const CredenzaClose = ({ className, children, ...props }: CredenzaProps) => {
//   const isDesktop = useMediaQuery(desktop)
//   const CredenzaClose = isDesktop ? DialogClose : DrawerClose

//   return (
//     <CredenzaClose className={className} {...props}>
//       {children}
//     </CredenzaClose>
//   )
// }

// const CredenzaContent = ({ className, children, ...props }: CredenzaProps) => {
//   const isDesktop = useMediaQuery(desktop)
//   const CredenzaContent = isDesktop ? DialogContent : DrawerContent

//   return (
//     <CredenzaContent className={className} {...props}>
//       {children}
//     </CredenzaContent>
//   )
// }

// const CredenzaDescription = ({
//   className,
//   children,
//   ...props
// }: CredenzaProps) => {
//   const isDesktop = useMediaQuery(desktop)
//   const CredenzaDescription = isDesktop ? DialogDescription : DrawerDescription

//   return (
//     <CredenzaDescription className={className} {...props}>
//       {children}
//     </CredenzaDescription>
//   )
// }

// const CredenzaHeader = ({ className, children, ...props }: CredenzaProps) => {
//   const isDesktop = useMediaQuery(desktop)
//   const CredenzaHeader = isDesktop ? DialogHeader : DrawerHeader

//   return (
//     <CredenzaHeader className={className} {...props}>
//       {children}
//     </CredenzaHeader>
//   )
// }

// const CredenzaTitle = ({ className, children, ...props }: CredenzaProps) => {
//   const isDesktop = useMediaQuery(desktop)
//   const CredenzaTitle = isDesktop ? DialogTitle : DrawerTitle

//   return (
//     <CredenzaTitle className={className} {...props}>
//       {children}
//     </CredenzaTitle>
//   )
// }

// const CredenzaFooter = ({ className, children, ...props }: CredenzaProps) => {
//   const isDesktop = useMediaQuery(desktop)
//   const CredenzaFooter = isDesktop ? DialogFooter : DrawerFooter

//   return (
//     <CredenzaFooter className={className} {...props}>
//       {children}
//     </CredenzaFooter>
//   )
// }

// export {
//   Credenza,
//   CredenzaTrigger,
//   CredenzaClose,
//   CredenzaContent,
//   CredenzaDescription,
//   CredenzaHeader,
//   CredenzaTitle,
//   CredenzaFooter,
// }


"use client"

import * as React from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { DialogClose } from "@radix-ui/react-dialog"

interface BaseProps {
  children: React.ReactNode
}

interface RootCredenzaProps extends BaseProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

interface CredenzaProps extends BaseProps {
  className?: string
  asChild?: true
}

const desktop = "(min-width: 768px)"

const Credenza = ({ children, ...props }: RootCredenzaProps) => {
  const isDesktop = useMediaQuery(desktop)
  const Component = isDesktop ? Dialog : Drawer

  return React.createElement(Component, props, children)
}

const CredenzaTrigger = ({ className, children, ...props }: CredenzaProps) => {
  const isDesktop = useMediaQuery(desktop)
  const Component = isDesktop ? DialogTrigger : DrawerTrigger

  return React.createElement(Component, { className, ...props }, children)
}

const CredenzaClose = ({ className, children, ...props }: CredenzaProps) => {
  const isDesktop = useMediaQuery(desktop)
  const Component = isDesktop ? DialogClose : DrawerClose

  return React.createElement(Component, { className, ...props }, children)
}

const CredenzaContent = ({ className, children, ...props }: CredenzaProps) => {
  const isDesktop = useMediaQuery(desktop)
  const Component = isDesktop ? DialogContent : DrawerContent

  return React.createElement(Component, { className, ...props }, children)
}

const CredenzaDescription = ({ className, children, ...props }: CredenzaProps) => {
  const isDesktop = useMediaQuery(desktop)
  const Component = isDesktop ? DialogDescription : DrawerDescription

  return React.createElement(Component, { className, ...props }, children)
}

const CredenzaHeader = ({ className, children, ...props }: CredenzaProps) => {
  const isDesktop = useMediaQuery(desktop)
  const Component = isDesktop ? DialogHeader : DrawerHeader

  return React.createElement(Component, { className, ...props }, children)
}

const CredenzaTitle = ({ className, children, ...props }: CredenzaProps) => {
  const isDesktop = useMediaQuery(desktop)
  const Component = isDesktop ? DialogTitle : DrawerTitle

  return React.createElement(Component, { className, ...props }, children)
}

const CredenzaFooter = ({ className, children, ...props }: CredenzaProps) => {
  const isDesktop = useMediaQuery(desktop)
  const Component = isDesktop ? DialogFooter : DrawerFooter

  return React.createElement(Component, { className, ...props }, children)
}

export {
  Credenza,
  CredenzaTrigger,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaFooter,
}
