"use client"

import { useFormik } from "formik"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signupSchema } from "@/lib/auth-schema"

export function SignupForm() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      console.log("Signup values:", values)
    },
  })

  return (
    <form className="space-y-4" onSubmit={formik.handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="John Doe"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          className={formik.touched.name && formik.errors.name ? "border-destructive" : ""}
        />
        {formik.touched.name && formik.errors.name && <p className="text-xs text-destructive">{formik.errors.name}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
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
        <Label htmlFor="signup-password">Password</Label>
        <Input
          id="signup-password"
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
        {formik.isSubmitting ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  )
}
