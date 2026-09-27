import React from 'react';
import {
  MapPin,
  LocateFixed,
  Calendar,
  Car,
  Bike,
  Bus,
  Footprints,
  Clock,
  Radio,
  Wifi,
  CheckCircle2,
  Lightbulb,
  CornerUpRight,
  ArrowLeftRight,
  Search,
  Mic,
  SlidersHorizontal,
  Flame,
  Bookmark,
  ThumbsUp,
  ChevronRight,
  ArrowRight,
  Users,
  Activity,
  Landmark,
  Building2,
  BellRing,
  User,
  Droplets,
  Bath,
  HeartPulse,
  Utensils,
  Armchair,
  Accessibility,
  Compass,
  Check,
  X,
  ExternalLink,
  Copy,
  Ticket,
  Download,
  Languages,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  RotateCw,
  Plus,
  Minus,
  Navigation,
  Layers,
  Sparkles,
  LogIn,
  AlertTriangle,
  Info,
  Music,
} from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, className = '', size = 18 }) => {
  const norm = name.trim().toLowerCase();

  switch (norm) {
    case 'location_on':
    case 'pin_drop':
      return <MapPin size={size} className={className} />;
    case 'my_location':
      return <LocateFixed size={size} className={className} />;
    case 'calendar_today':
    case 'calendar':
      return <Calendar size={size} className={className} />;
    case 'local_parking':
      return (
        <span
          className={`inline-flex items-center justify-center font-bold font-sans rounded text-[10px] leading-none ${className}`}
          style={{ width: size, height: size }}
        >
          P
        </span>
      );
    case 'directions_car':
      return <Car size={size} className={className} />;
    case 'two_wheeler':
      return <Bike size={size} className={className} />;
    case 'directions_bus':
      return <Bus size={size} className={className} />;
    case 'directions_walk':
      return <Footprints size={size} className={className} />;
    case 'schedule':
      return <Clock size={size} className={className} />;
    case 'sensors_off':
      return <Radio size={size} className={className} />;
    case 'sensors':
      return <Wifi size={size} className={className} />;
    case 'verified':
    case 'check_circle':
      return <CheckCircle2 size={size} className={className} />;
    case 'wb_incandescent':
      return <Lightbulb size={size} className={className} />;
    case 'turn_right':
      return <CornerUpRight size={size} className={className} />;
    case 'swap_horiz':
      return <ArrowLeftRight size={size} className={className} />;
    case 'search':
      return <Search size={size} className={className} />;
    case 'mic':
      return <Mic size={size} className={className} />;
    case 'tune':
      return <SlidersHorizontal size={size} className={className} />;
    case 'local_fire_department':
      return <Flame size={size} className={className} />;
    case 'bookmark':
      return <Bookmark size={size} className={`fill-current ${className}`} />;
    case 'bookmark_border':
      return <Bookmark size={size} className={className} />;
    case 'thumb_up':
      return <ThumbsUp size={size} className={className} />;
    case 'chevron_right':
      return <ChevronRight size={size} className={className} />;
    case 'arrow_forward':
      return <ArrowRight size={size} className={className} />;
    case 'diversity_3':
      return <Users size={size} className={className} />;
    case 'sports_martial_arts':
      return <Activity size={size} className={className} />;
    case 'temple_hindu':
      return <Landmark size={size} className={className} />;
    case 'stadium':
      return <Building2 size={size} className={className} />;
    case 'notifications_active':
      return <BellRing size={size} className={className} />;
    case 'person':
      return <User size={size} className={className} />;
    case 'water_drop':
      return <Droplets size={size} className={className} />;
    case 'wc':
      return <Bath size={size} className={className} />;
    case 'medical_services':
      return <HeartPulse size={size} className={className} />;
    case 'restaurant':
      return <Utensils size={size} className={className} />;
    case 'chair':
      return <Armchair size={size} className={className} />;
    case 'accessible':
      return <Accessibility size={size} className={className} />;
    case 'directions':
      return <Compass size={size} className={className} />;
    case 'check':
      return <Check size={size} className={className} />;
    case 'close':
      return <X size={size} className={className} />;
    case 'open_in_new':
      return <ExternalLink size={size} className={className} />;
    case 'copy':
      return <Copy size={size} className={className} />;
    case 'confirmation_number':
      return <Ticket size={size} className={className} />;
    case 'download':
      return <Download size={size} className={className} />;
    case 'translate':
      return <Languages size={size} className={className} />;
    case 'local_police':
      return <ShieldAlert size={size} className={className} />;
    case 'expand_more':
      return <ChevronDown size={size} className={className} />;
    case 'expand_less':
      return <ChevronUp size={size} className={className} />;
    case 'refresh':
      return <RotateCw size={size} className={className} />;
    case 'add':
      return <Plus size={size} className={className} />;
    case 'remove':
      return <Minus size={size} className={className} />;
    case 'near_me':
      return <Navigation size={size} className={className} />;
    case 'layers':
      return <Layers size={size} className={className} />;
    case 'festival':
      return <Sparkles size={size} className={className} />;
    case 'door_front':
      return <LogIn size={size} className={className} />;
    case 'warning':
      return <AlertTriangle size={size} className={className} />;
    case 'info':
      return <Info size={size} className={className} />;
    case 'music_note':
      return <Music size={size} className={className} />;
    default:
      return <Sparkles size={size} className={className} />;
  }
};
