"use client"

import { useFormik } from "formik"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginSchema } from "@/lib/auth-schema"

interface LoginFormProps {
  onForgotPassword: () => void
}

export function LoginForm({ onForgotPassword }: LoginFormProps) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log("Login values:", values)
    },
  })

  return (
    <form className="space-y-4" onSubmit={formik.handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="m@example.com"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className={formik.touched.email && formik.errors.email ? "border-destructive" : ""}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-xs text-destructive">{formik.errors.email}</p>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <button type="button" onClick={onForgotPassword} className="text-xs text-primary hover:underline">
            Forgot password?
          </button>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className={formik.touched.password && formik.errors.password ? "border-destructive" : ""}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-xs text-destructive">{formik.errors.password}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  )
}
