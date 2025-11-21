import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { User, Bell, Lock, Building2, Loader2 } from "lucide-react";
import { useGetHospitalQuery, useUpdateHospitalMutation } from "@/features/hospital/hospitalApiSlice";
import { useUpdatePasswordMutation, useUpdateProfileMutation } from "@/features/auth/authApiSlice";
import { selectAuthUser, updateUser } from "@/features/auth/authSlice";

export default function Settings() {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  const { data: hospitalData, isLoading: isHospitalLoading } = useGetHospitalQuery();
  const [updateHospital, { isLoading: isUpdating }] = useUpdateHospitalMutation();
  const [updatePassword, { isLoading: isPasswordUpdating }] = useUpdatePasswordMutation();
  const [updateProfile, { isLoading: isProfileUpdating }] = useUpdateProfileMutation();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      emergency: ""
    }
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
    formState: { errors: passwordErrors }
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  });

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    setValue: setProfileValue,
    formState: { errors: profileErrors }
  } = useForm({
    defaultValues: {
      name: "",
      email: ""
    }
  });

  useEffect(() => {
    if (hospitalData?.data) {
      setValue("name", hospitalData.data.name);
      setValue("address", hospitalData.data.address);
      if (hospitalData.data.metadata) {
        setValue("phone", hospitalData.data.metadata.phone || "");
        setValue("emergency", hospitalData.data.metadata.emergency || "");
      }
    }
  }, [hospitalData, setValue]);

  useEffect(() => {
    if (user) {
      setProfileValue("name", user.name);
      setProfileValue("email", user.email);
    }
  }, [user, setProfileValue]);

  const onSubmit = async (data: any) => {
    try {
      await updateHospital({
        name: data.name,
        address: data.address,
        metadata: {
          phone: data.phone,
          emergency: data.emergency
        }
      }).unwrap();
      toast.success("Hospital information updated successfully");
    } catch (error) {
      toast.error("Failed to update hospital information");
      console.error(error);
    }
  };

  const onPasswordSubmit = async (data: any) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    try {
      await updatePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      }).unwrap();
      toast.success("Password updated successfully");
      resetPassword();
    } catch (error: any) {
      toast.error(error?.data?.error || "Failed to update password");
    }
  };

  const onProfileSubmit = async (data: any) => {
    try {
      const result = await updateProfile(data).unwrap();
      dispatch(updateUser(result.user));
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error?.data?.error || "Failed to update profile");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Settings</h2>
        <p className="text-muted-foreground mt-1">Manage system preferences and configurations.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <CardTitle>Profile Settings</CardTitle>
          </div>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmitProfile(onProfileSubmit)} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  {...registerProfile("name", { required: "Name is required" })}
                />
                {profileErrors.name && <p className="text-sm text-destructive">{profileErrors.name.message as string}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@hospital.com"
                  {...registerProfile("email", { required: "Email is required" })}
                />
                {profileErrors.email && <p className="text-sm text-destructive">{profileErrors.email.message as string}</p>}
              </div>
            </div>
            <Button type="submit" disabled={isProfileUpdating}>
              {isProfileUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* //Notification */}
      {/* <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle>Notifications</CardTitle>
          </div>
          <CardDescription>Configure notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Patient Admissions</Label>
              <p className="text-sm text-muted-foreground">Receive alerts for new patient admissions</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Critical Alerts</Label>
              <p className="text-sm text-muted-foreground">Emergency notifications for critical patients</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Daily Reports</Label>
              <p className="text-sm text-muted-foreground">Receive daily summary reports</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card> */}

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            <CardTitle>Security</CardTitle>
          </div>
          <CardDescription>Manage your security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmitPassword(onPasswordSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                {...registerPassword("currentPassword", { required: "Current password is required" })}
              />
              {passwordErrors.currentPassword && <p className="text-sm text-destructive">{passwordErrors.currentPassword.message as string}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                {...registerPassword("newPassword", { required: "New password is required", minLength: { value: 8, message: "Password must be at least 8 characters" } })}
              />
              {passwordErrors.newPassword && <p className="text-sm text-destructive">{passwordErrors.newPassword.message as string}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                {...registerPassword("confirmPassword", { required: "Please confirm your password" })}
              />
              {passwordErrors.confirmPassword && <p className="text-sm text-destructive">{passwordErrors.confirmPassword.message as string}</p>}
            </div>
            <Button type="submit" disabled={isPasswordUpdating}>
              {isPasswordUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <CardTitle>Hospital Information</CardTitle>
          </div>
          <CardDescription>Configure hospital details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isHospitalLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hospital-name">Hospital Name</Label>
                <Input
                  id="hospital-name"
                  placeholder="Central Medical Hospital"
                  {...register("name", { required: "Hospital name is required" })}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message as string}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="hospital-address">Address</Label>
                <Input
                  id="hospital-address"
                  placeholder="123 Healthcare Street"
                  {...register("address")}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 234 567 8900"
                    {...register("phone")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergency">Emergency Contact</Label>
                  <Input
                    id="emergency"
                    type="tel"
                    placeholder="+1 234 567 8911"
                    {...register("emergency")}
                  />
                </div>
              </div>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Hospital Info
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
