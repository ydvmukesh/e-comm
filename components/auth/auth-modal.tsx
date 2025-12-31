"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "./login-modal"
import { SignupForm } from "./signup-modal"
import { ForgotPasswordForm } from "./forgot-password-modal"


interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [view, setView] = useState<"login" | "signup" | "forgot">("login")

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose()
      setTimeout(() => setView("login"), 200)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {view === "login" ? "Welcome Back" : view === "signup" ? "Create Account" : "Reset Password"}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {view !== "forgot" ? (
            <Tabs
              defaultValue={view}
              value={view}
              onValueChange={(v) => setView(v as "login" | "signup")}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Signup</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <LoginForm onForgotPassword={() => setView("forgot")} />
              </TabsContent>

              <TabsContent value="signup">
                <SignupForm />
              </TabsContent>
            </Tabs>
          ) : (
            <ForgotPasswordForm onBackToLogin={() => setView("login")} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
