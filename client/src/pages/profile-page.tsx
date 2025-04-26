import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";

const profileSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  title: z.string().optional(),
  company: z.string().optional(),
  industry: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  expertise: z.array(z.string()).optional(),
  certifications: z.array(z.string()).optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { user, updateProfileMutation } = useAuth();
  const [expertiseInput, setExpertiseInput] = useState("");
  const [certificationInput, setCertificationInput] = useState("");
  
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      title: user?.title || "",
      company: user?.company || "",
      industry: user?.industry || "",
      bio: user?.bio || "",
      location: user?.location || "",
      expertise: user?.expertise as string[] || [],
      certifications: user?.certifications as string[] || [],
    },
  });

  const onSubmit = (values: ProfileFormValues) => {
    updateProfileMutation.mutate(values);
  };

  const addExpertise = () => {
    if (expertiseInput.trim()) {
      const currentExpertise = profileForm.getValues().expertise || [];
      profileForm.setValue('expertise', [...currentExpertise, expertiseInput.trim()]);
      setExpertiseInput("");
    }
  };

  const removeExpertise = (index: number) => {
    const currentExpertise = profileForm.getValues().expertise || [];
    profileForm.setValue('expertise', currentExpertise.filter((_, i) => i !== index));
  };

  const addCertification = () => {
    if (certificationInput.trim()) {
      const currentCertifications = profileForm.getValues().certifications || [];
      profileForm.setValue('certifications', [...currentCertifications, certificationInput.trim()]);
      setCertificationInput("");
    }
  };

  const removeCertification = (index: number) => {
    const currentCertifications = profileForm.getValues().certifications || [];
    profileForm.setValue('certifications', currentCertifications.filter((_, i) => i !== index));
  };
  
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <p>Loading profile information...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-800">My Profile</h1>
        <p className="text-neutral-600 mt-1">Manage your personal information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar with profile stats and info */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center">
                <div className="relative">
                  <img 
                    src={user.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=random&size=120`} 
                    alt={user.fullName} 
                    className="w-28 h-28 rounded-full object-cover"
                  />
                  <Button variant="ghost" size="sm" className="absolute bottom-0 right-0 rounded-full bg-white shadow-sm border hover:bg-gray-100 p-1.5">
                    <span className="material-icons text-lg">edit</span>
                  </Button>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-neutral-800">{user.fullName}</h2>
                <p className="text-neutral-500">{user.title} {user.company ? `at ${user.company}` : ""}</p>
                
                <div className="mt-4 flex items-center justify-between w-full">
                  <span className="text-sm font-medium text-neutral-700">Profile completion</span>
                  <span className="text-xs text-primary font-medium">{user.profileCompleted}%</span>
                </div>
                <Progress value={user.profileCompleted} className="h-2 mt-2 w-full" />
              </div>

              <Separator className="my-6" />
              
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <span className="material-icons text-neutral-500 mr-3 text-xl">mail</span>
                  <span>{user.email}</span>
                </div>
                {user.location && (
                  <div className="flex items-center text-sm">
                    <span className="material-icons text-neutral-500 mr-3 text-xl">location_on</span>
                    <span>{user.location}</span>
                  </div>
                )}
                {user.company && (
                  <div className="flex items-center text-sm">
                    <span className="material-icons text-neutral-500 mr-3 text-xl">business</span>
                    <span>{user.company}</span>
                  </div>
                )}
                {user.industry && (
                  <div className="flex items-center text-sm">
                    <span className="material-icons text-neutral-500 mr-3 text-xl">category</span>
                    <span>{user.industry}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Account Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <Button variant="ghost" className="justify-start w-full text-sm">
                  <span className="material-icons mr-2 text-sm">security</span>
                  Change Password
                </Button>
                <Button variant="ghost" className="justify-start w-full text-sm">
                  <span className="material-icons mr-2 text-sm">notifications</span>
                  Notification Settings
                </Button>
                <Button variant="ghost" className="justify-start w-full text-sm">
                  <span className="material-icons mr-2 text-sm">privacy_tip</span>
                  Privacy Settings
                </Button>
                <Button variant="ghost" className="justify-start w-full text-red-600 hover:text-red-700 hover:bg-red-50">
                  <span className="material-icons mr-2 text-sm">delete</span>
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content with profile edit form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your profile information to help others connect with you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="mb-6 grid w-full grid-cols-3">
                  <TabsTrigger value="personal">Basic Info</TabsTrigger>
                  <TabsTrigger value="expertise">Expertise</TabsTrigger>
                  <TabsTrigger value="professional">Professional</TabsTrigger>
                </TabsList>
                
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onSubmit)}>
                    {/* Personal Information Tab */}
                    <TabsContent value="personal" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={profileForm.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Sarah Johnson" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={profileForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="name@example.com" {...field} readOnly className="bg-neutral-50" />
                              </FormControl>
                              <FormDescription>
                                Email cannot be changed
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={profileForm.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about yourself and your experience in IR..." 
                                className="min-h-32" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input placeholder="New York, NY" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>

                    {/* Expertise Tab */}
                    <TabsContent value="expertise" className="space-y-6">
                      <div>
                        <FormLabel>Areas of Expertise</FormLabel>
                        <div className="flex mt-2">
                          <Input 
                            placeholder="E.g., Shareholder Engagement" 
                            value={expertiseInput}
                            onChange={(e) => setExpertiseInput(e.target.value)}
                            className="mr-2"
                          />
                          <Button type="button" onClick={addExpertise}>Add</Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {profileForm.watch('expertise')?.map((item, index) => (
                            <div key={index} className="bg-neutral-100 px-3 py-1.5 rounded-full flex items-center">
                              <span className="text-sm">{item}</span>
                              <button 
                                type="button" 
                                className="ml-2 text-neutral-500 hover:text-neutral-700"
                                onClick={() => removeExpertise(index)}
                              >
                                <span className="material-icons text-sm">close</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <FormLabel>Certifications</FormLabel>
                        <div className="flex mt-2">
                          <Input 
                            placeholder="E.g., CFA, NIRI-IRC" 
                            value={certificationInput}
                            onChange={(e) => setCertificationInput(e.target.value)}
                            className="mr-2"
                          />
                          <Button type="button" onClick={addCertification}>Add</Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {profileForm.watch('certifications')?.map((item, index) => (
                            <div key={index} className="bg-neutral-100 px-3 py-1.5 rounded-full flex items-center">
                              <span className="text-sm">{item}</span>
                              <button 
                                type="button" 
                                className="ml-2 text-neutral-500 hover:text-neutral-700"
                                onClick={() => removeCertification(index)}
                              >
                                <span className="material-icons text-sm">close</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    {/* Professional Tab */}
                    <TabsContent value="professional" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={profileForm.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Job Title</FormLabel>
                              <FormControl>
                                <Input placeholder="IR Director" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={profileForm.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company</FormLabel>
                              <FormControl>
                                <Input placeholder="Company Name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={profileForm.control}
                        name="industry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Industry</FormLabel>
                            <FormControl>
                              <Input placeholder="Technology, Finance, etc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>

                    <div className="mt-6 flex justify-end">
                      <Button 
                        type="submit" 
                        disabled={updateProfileMutation.isPending || !profileForm.formState.isDirty}
                      >
                        {updateProfileMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                            Saving Changes
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Portfolio and Experience</CardTitle>
              <CardDescription>
                Add your past work experiences and IR portfolio to showcase your skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-neutral-500">
                <span className="material-icons text-5xl mb-2">work</span>
                <p>This section is coming soon</p>
                <p className="text-sm mt-1">You'll be able to add your work history and upload portfolio pieces here.</p>
                <Button variant="outline" className="mt-4" disabled>
                  Coming Soon
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
