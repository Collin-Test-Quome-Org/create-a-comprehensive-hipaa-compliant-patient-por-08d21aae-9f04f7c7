import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CheckCircle, AlertCircle, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'

export function AdminSettingsPage() {
  // Simulated settings state
  const [hipaaEnabled, setHipaaEnabled] = useState(true)
  const [mfaRequired, setMfaRequired] = useState(true)
  const [notifEmail, setNotifEmail] = useState('admin@patientportal.com')
  const [saveSuccess, setSaveSuccess] = useState(false)

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 1800)
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto p-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-8 gap-4">
        <ShieldCheck className="w-10 h-10 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold font-inter tracking-tight">System Settings</h1>
          <p className="text-secondary/80 font-roboto">Administer HIPAA, MFA, and notification configurations for your Patient Portal.</p>
        </div>
      </div>

      <Tabs defaultValue="hipaa" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="hipaa">HIPAA</TabsTrigger>
          <TabsTrigger value="mfa">MFA</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="hipaa">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" /> HIPAA Compliance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-semibold">HIPAA Mode</h2>
                  <p className="text-muted-foreground text-sm max-w-md">When enabled, all data interactions are encrypted and audit logs are enforced for regulatory compliance.</p>
                </div>
                <Switch
                  id="hipaa-mode-switch"
                  checked={hipaaEnabled}
                  onCheckedChange={setHipaaEnabled}
                  aria-label="Enable HIPAA Mode"
                />
              </div>
              <Separator />
              <div className="mt-4">
                <span className="text-xs text-secondary">Compliant with 45 CFR Parts 160, 162, and 164</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="mfa">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" /> Multi-Factor Authentication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-semibold">Require MFA for All Users</h2>
                  <p className="text-muted-foreground text-sm max-w-md">Enhance security by requiring users to complete a second authentication step when logging in.</p>
                </div>
                <Switch
                  id="mfa-required-switch"
                  checked={mfaRequired}
                  onCheckedChange={setMfaRequired}
                  aria-label="Require MFA for All Users"
                />
              </div>
              <Separator />
              <div className="mt-4 text-xs text-secondary">
                Applies to both staff and patient accounts.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600" /> Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-5">
                <div>
                  <Label htmlFor="notif-email">Notification Email</Label>
                  <Input
                    id="notif-email"
                    className="mt-1"
                    value={notifEmail}
                    onChange={e => setNotifEmail(e.target.value)}
                    type="email"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">Primary email for system notifications (alerts, errors, audit reports)</p>
                </div>
                <div className="flex gap-4">
                  <Button id="save-notification-settings" type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                    Save Settings
                  </Button>
                  {saveSuccess && (
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="text-green-600 font-medium flex items-center gap-1"
                    >
                      <CheckCircle className="w-4 h-4" /> Saved!
                    </motion.span>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
