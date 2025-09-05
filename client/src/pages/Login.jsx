import { AppWindowIcon, CodeIcon, Loader, Loader2 } from "lucide-react"
import Particles from "@/olg/Ripple"
import { useRegisterUserMutation , useLoginUserMutation } from "@/features/api/authApi"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from "react"

const Login = () => {
  const [login, setlogin] = useState({
    email: "",
    pass: ""
  })
  const [signup, setsignup] = useState({
    name: "",
    email: "",
    pass: ""
  })

  const [registerUser, { data: registerData, error: registerError, isLoading: registerIsLoading, isSuccess: registerIsSuccess }] = useRegisterUserMutation()
  const [loginUser,{ data: loginData, error: loginError, isLoading: loginIsLoading, isSuccess: loginIsSuccess }] = useLoginUserMutation()


  const handleInputs = (e, type) => {
    if (type === "signup") {
      setsignup({ ...signup, [e.target.name]: e.target.value })
      // console.log({...signup,[e.target.name] : e.target.value});

    } else {
      setlogin({ ...login, [e.target.name]: e.target.value })
      // console.log({...login,[e.target.name] : e.target.value});

    }
  }

  const submitForm = async (type) => {
    if (type === "signup") {
      await registerUser(signup) 
      console.log("signup", signup);

    } else {
      await loginUser(login) 
      console.log("Logged in", login);
    }
  }

  return (
    <div className="flex m-0 justify-center items-center w-full h-[100vh] bg-black">
      <div style={{ width: '100%', height: '700px', position: 'absolute', zIndex: "1" }}>
        <div style={{ width: '100%', height: '730px', position: 'fixed' }}>
          <Particles
            mouseRepulsion={true}
            mouseInteraction={true}
            density={1.5}
            glowIntensity={0.5}
            saturation={0.8}
            hueShift={240}
          />

        </div>
      </div>
      <div className="flex w-full max-w-sm flex-col gap-6 " style={{ zIndex: "2" }}>
        <Tabs defaultValue="signup">
          <TabsList className="w-full">
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>
                  Create New Account
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-name">Name</Label>
                  <Input onChange={(e) => { handleInputs(e, "signup") }} value={signup.name} name="name" id="tabs-demo-name" placeholder="Eg :- Rohit" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-username">Email</Label>
                  <Input onChange={(e) => { handleInputs(e, "signup") }} value={signup.email} name="email" id="tabs-demo-username" placeholder="Eg :- rohit@gmail.com" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-username">Password</Label>
                  <Input onChange={(e) => { handleInputs(e, "signup") }} value={signup.pass} name="pass" id="tabs-demo-username" placeholder="Eg :- xyz" />
                </div>
              </CardContent>
              <CardFooter>
                <Button disabled={registerIsLoading} onClick={() => { submitForm("signup") }}>{
                  registerIsLoading ? (
                    <>
                      <Loader2 className="m-2 h-4 w-4 animate-spin"/> Please wait
                    </>
                  ) : "Sign Up"
                  }</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Log in</CardTitle>
                <CardDescription>
                  Log in
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-current" >Email</Label>
                  <Input onChange={(e) => { handleInputs(e, "login") }} value={login.email} name="email" id="tabs-demo-current" type="password" placeholder="Eg :- rohit@gmail.com" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-new">Password</Label>
                  <Input onChange={(e) => { handleInputs(e, "login") }} value={login.pass} name="pass" id="tabs-demo-new" type="password" placeholder="Eg :- xyz" />
                </div>
              </CardContent>
              <CardFooter>
                <Button disabled={loginIsLoading} onClick={() => { submitForm("login") }}>{
                  loginIsLoading ? (
                    <>
                      <Loader2 className="m-2 h-4 w-4 animate-spin"/> Please wait
                    </>
                  ) : "Log in"
                  }</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Login