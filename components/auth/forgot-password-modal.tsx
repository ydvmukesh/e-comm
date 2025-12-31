"use client"

import { useFormik } from "formik"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { forgotPasswordSchema } from "@/lib/auth-schema"

interface ForgotPasswordFormProps {
  onBackToLogin: () => void
}


export function ForgotPasswordForm({ onBackToLogin }: ForgotPasswordFormProps) {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      console.log("Forgot password values:", values)
    },
  })

  return (
    <form className="space-y-4" onSubmit={formik.handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="forgot-email">Email</Label>
        <Input
          id="forgot-email"
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
      <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? "Sending..." : "Send Reset Link"}
      </Button>
      <Button variant="ghost" className="w-full" onClick={onBackToLogin} type="button">
        Back to Login
      </Button>
    </form>
  )
}
