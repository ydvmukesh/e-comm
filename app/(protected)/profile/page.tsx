"use client"

import { useState } from "react"
import { User, LogOut, CreditCard, ChevronRight, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    name: "Alex Thompson",
    email: "alex.t@example.com",
    phone: "+1 (555) 000-0000",
    address: "123 Elegance St, Minimal City, 90210",
  })

  const orders = [
    { id: "#ORD-7742", date: "Dec 12, 2023", total: "$344.00", status: "Delivered" },
    { id: "#ORD-8821", date: "Nov 28, 2023", total: "$129.00", status: "Shipped" },
    { id: "#ORD-9910", date: "Oct 15, 2023", total: "$59.00", status: "Processing" },
  ]

  const handleSave = () => {
    setIsEditing(false)
    console.log("[v0] Profile saved:", userData)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <User className="size-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{userData.name}</h1>
            <p className="text-muted-foreground">Member since 2023</p>
          </div>
        </div>
        <Button variant="outline" className="rounded-xl border-2 bg-destructive/10 gap-2 text-destructive border-destructive hover:bg-destructive/10" >
          <LogOut className="size-4" />
          Sign Out
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-8">
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="profile"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Personal Details
          </TabsTrigger>
          <TabsTrigger
            value="orders"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Order History
          </TabsTrigger>
          {/* <TabsTrigger
            value="settings"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Account Settings
          </TabsTrigger> */}
        </TabsList>

        <TabsContent value="profile" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <Card className="lg:col-span-2 rounded-[2rem] border shadow-none">
              <CardHeader className="flex flex-row flex-wrap items-center justify-between border-b px-8 py-6">
                <div>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Manage your personal details and contact info</CardDescription>
                </div>
                {!isEditing ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg bg-transparent"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile <Edit className="size-4" />
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button size="sm" className="rounded-lg" onClick={handleSave}>
                      Save Changes
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Full Name</Label>
                    {isEditing ? (
                      <Input
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        className="rounded-lg"
                      />
                    ) : (
                      <p className="font-semibold">{userData.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Email Address</Label>
                    {isEditing ? (
                      <Input
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        className="rounded-lg"
                      />
                    ) : (
                      <p className="font-semibold">{userData.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Phone Number</Label>
                    {isEditing ? (
                      <Input
                        value={userData.phone}
                        onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                        className="rounded-lg"
                      />
                    ) : (
                      <p className="font-semibold">{userData.phone}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Shipping Address</Label>
                    {isEditing ? (
                      <Input
                        value={userData.address}
                        onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                        className="rounded-lg"
                      />
                    ) : (
                      <p className="font-semibold">{userData.address}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="rounded-[2rem] border shadow-none bg-primary/5">
                <CardContent className="p-8 flex flex-col items-center text-center gap-4">
                  <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <CreditCard className="size-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold">Payment Method</h3>
                    <p className="text-sm text-muted-foreground">Visa ending in **** 4242</p>
                  </div>
                  <Button variant="link" className="text-primary font-bold">
                    Update Card
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="rounded-[2rem] border shadow-none overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="px-8 py-4">Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right px-8">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-muted/30">
                    <TableCell className="px-8 py-6 font-bold">{order.id}</TableCell>
                    <TableCell className="text-muted-foreground">{order.date}</TableCell>
                    <TableCell className="font-bold">{order.total}</TableCell>
                    <TableCell>
                      <Badge
                        variant={order.status === "Delivered" ? "secondary" : "outline"}
                        className={`rounded-lg ${order.status === "Delivered" ? "bg-emerald-100 text-emerald-700" : ""}`}
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right px-8">
                      <Button variant="ghost" size="sm" className="gap-1 rounded-lg">
                        Details
                        <ChevronRight className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* <TabsContent value="settings" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="rounded-[2rem] border shadow-none">
            <CardHeader className="px-8 py-6">
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Update your password and security preferences</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center justify-between border-b pb-6">
                <div className="space-y-1">
                  <p className="font-bold">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                </div>
                <Button variant="outline" className="rounded-lg bg-transparent">
                  Enable
                </Button>
              </div>
              <div className="flex items-center justify-between border-b pb-6">
                <div className="space-y-1">
                  <p className="font-bold">Password</p>
                  <p className="text-sm text-muted-foreground">Last changed 3 months ago.</p>
                </div>
                <Button variant="outline" className="rounded-lg bg-transparent">
                  Update
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  )
}
