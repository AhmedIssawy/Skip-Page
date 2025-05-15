import React from "react";
import { 
  CheckCircle2, 
  XCircle, 
  Truck, 
  Clock, 
  PoundSterling, 
  Map, 
  AlertTriangle,
  AlertCircle
} from "lucide-react";

export const Icons = {
  check: CheckCircle2,
  cross: XCircle,
  truck: Truck,
  clock: Clock,
  currency: PoundSterling,
  location: Map,
  warning: AlertTriangle,
  error: AlertCircle
};

export type IconName = keyof typeof Icons;

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 24, className = "", ...props }: IconProps) {
  const IconComponent = Icons[name];
  return <IconComponent size={size} className={className} {...props} />;
}