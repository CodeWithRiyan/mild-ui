// packages/core/src/components/Alert/Alert.types.ts
export type AlertStatus = 'info' | 'success' | 'warning' | 'error';
export type AlertVariant = 'subtle' | 'solid' | 'left-accent' | 'top-accent';
export type AlertSize = 'sm' | 'md' | 'lg';

export interface AlertCoreProps {
  /** Alert status/severity */
  status?: AlertStatus;
  /** Visual variant */
  variant?: AlertVariant;
  /** Component size */
  size?: AlertSize;
  /** Custom title */
  title?: string;
  /** Whether alert can be dismissed */
  dismissible?: boolean;
  /** Dismiss callback */
  onDismiss?: () => void;
  /** Custom icon */
  icon?: any; // Platform-specific icon type
  /** Hide default icon */
  hideIcon?: boolean;
  /** Custom className */
  className?: string;
  /** Auto-dismiss timeout (ms) */
  autoHideDuration?: number;
}

export interface AlertIconMap {
  info: any;
  success: any;
  warning: any;
  error: any;
}

export type AlertProps = AlertCoreProps;