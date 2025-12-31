"use client"

import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

const contactSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9+\-\s()]*$/, "Invalid phone number")
    .min(10, "Phone number must be at least 10 digits"),
  subject: Yup.string()
    .min(3, "Subject must be at least 3 characters")
    .required("Subject is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
})

export default function ContactPage() {
  const { toast } = useToast()

  const handleSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    })
    
    resetForm()
    setSubmitting(false)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Have a question? We're here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Contact Information */}
        <div className="flex flex-col space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <p className="text-muted-foreground leading-relaxed">
              We're always happy to hear from you. Whether you have a question about products, 
              orders, or anything else, our team is ready to answer all your questions.
            </p>
          </div>

          <div className="space-y-4">
            <Card className="border-none shadow-sm">
              <CardContent className="flex items-start gap-4 p-6">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="size-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-sm text-muted-foreground">support@elegance.com</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-muted/30">
              <CardContent className="flex items-start gap-4 p-6">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Phone className="size-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardContent className="flex items-start gap-4 p-6">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="size-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Address</h3>
                  <p className="text-sm text-muted-foreground">
                    123 Elegance Street<br />
                    Design District, NY 10001
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-xl border bg-muted/30 p-6">
            <h3 className="font-semibold mb-2">Business Hours</h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="flex flex-col">
          <Card className="border-none shadow-lg flex-1">
            <CardContent className="p-8 h-full flex flex-col">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  phone: "",
                  subject: "",
                  message: "",
                }}
                validationSchema={contactSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form className="space-y-6 flex-1 flex flex-col">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Field
                          as={Input}
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          className="mt-1"
                        />
                        <ErrorMessage name="name">
                          {(msg) => <p className="mt-1 text-xs text-red-500">{msg}</p>}
                        </ErrorMessage>
                      </div>

                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Field
                          as={Input}
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          className="mt-1"
                        />
                        <ErrorMessage name="email">
                          {(msg) => <p className="mt-1 text-xs text-red-500">{msg}</p>}
                        </ErrorMessage>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">
                      <div>
                        <Label htmlFor="phone">Phone (Optional)</Label>
                        <Field
                          as={Input}
                          id="phone"
                          name="phone"
                          placeholder="+1 (555) 123-4567"
                          className="mt-1"
                        />
                        <ErrorMessage name="phone">
                          {(msg) => <p className="mt-1 text-xs text-red-500">{msg}</p>}
                        </ErrorMessage>
                      </div>

                      <div>
                        <Label htmlFor="subject">Subject *</Label>
                        <Field
                          as={Input}
                          id="subject"
                          name="subject"
                          placeholder="How can we help?"
                          className="mt-1"
                        />
                        <ErrorMessage name="subject">
                          {(msg) => <p className="mt-1 text-xs text-red-500">{msg}</p>}
                        </ErrorMessage>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <Label htmlFor="message">Message *</Label>
                      <Field
                        as={Textarea}
                        id="message"
                        name="message"
                        placeholder="Tell us more about your inquiry..."
                        rows={8}
                        className="mt-2 resize-none flex-1"
                      />
                      <ErrorMessage name="message">
                        {(msg) => <p className="mt-1 text-xs text-red-500">{msg}</p>}
                      </ErrorMessage>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full gap-2 rounded-xl"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                      <Send className="size-4" />
                    </Button>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

