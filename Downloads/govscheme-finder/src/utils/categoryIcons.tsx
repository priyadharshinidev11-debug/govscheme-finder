import React from 'react';
import { 
  Wheat, 
  HeartPulse, 
  GraduationCap, 
  Users, 
  Home, 
  Briefcase, 
  Wrench, 
  Coins, 
  Award,
  Layers
} from 'lucide-react';

export function getCategoryIcon(iconName: string, className = 'w-6 h-6') {
  switch (iconName?.toLowerCase()) {
    case 'wheat':
      return <Wheat className={className} />;
    case 'heartpulse':
      return <HeartPulse className={className} />;
    case 'graduationcap':
      return <GraduationCap className={className} />;
    case 'users':
      return <Users className={className} />;
    case 'home':
      return <Home className={className} />;
    case 'briefcase':
      return <Briefcase className={className} />;
    case 'wrench':
      return <Wrench className={className} />;
    case 'coins':
      return <Coins className={className} />;
    case 'award':
      return <Award className={className} />;
    default:
      return <Layers className={className} />;
  }
}
