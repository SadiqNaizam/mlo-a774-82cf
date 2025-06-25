import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { User, Bell, Shield, LogOut, ChevronRight, Globe, MessageCircleQuestion, Sparkles } from 'lucide-react';

interface UserSettingsProps {
  onLogout: () => void;
  className?: string;
}

type SettingItem = {
  icon: React.ElementType;
  label: string;
  description?: string;
};

const mainSettings: SettingItem[] = [
  { icon: User, label: 'Account Holder', description: 'Manage your profile' },
  { icon: Shield, label: 'Security Settings', description: 'Passwords, devices, 2FA' },
  { icon: Bell, label: 'Notification Preferences', description: 'Email, push, and SMS' },
];

const otherSettings: SettingItem[] = [
  { icon: Globe, label: 'Language', description: 'English' },
  { icon: Sparkles, label: 'App Preferences', description: 'Theme and accessibility' },
  { icon: MessageCircleQuestion, label: 'Customer Service', description: 'Get help and support' },
];

const UserSettings: React.FC<UserSettingsProps> = ({ onLogout, className }) => {
  const SettingRow: React.FC<SettingItem> = ({ icon: Icon, label, description }) => (
    <button className="flex items-center w-full text-left p-4 hover:bg-accent cursor-pointer">
      <Icon className="h-6 w-6 mr-4 text-primary" />
      <div className="flex-grow">
        <p className="font-semibold text-foreground">{label}</p>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </button>
  );

  return (
    <div className={cn("flex flex-col h-full bg-background", className)}>
      <div className="flex-grow p-4 space-y-6">
        <div className="flex items-center space-x-4 pt-4">
          <Avatar className="h-16 w-16 border-2 border-primary/40">
            <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Alex Thompson" />
            <AvatarFallback>AT</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">Alex Thompson</h2>
            <p className="text-muted-foreground text-sm">Member since June 2022</p>
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-0">
              {mainSettings.map((item, index) => (
                <React.Fragment key={item.label}>
                  <SettingRow {...item} />
                  {index < mainSettings.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
               {otherSettings.map((item, index) => (
                <React.Fragment key={item.label}>
                  <SettingRow {...item} />
                  {index < otherSettings.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="p-4 border-t border-border mt-auto">
        <Button variant="outline" className="w-full" onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    </div>
  );
};

export default UserSettings;
