// packages/core/src/components/Modal/Modal.types.ts
export interface ModalCoreProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    className?: string;
  }
  
  export interface ModalStyleProps {
    size?: ModalSize;
    centered?: boolean;
  }
  
  export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";
  
  // Content props
  export interface ModalContentCoreProps {
    className?: string;
    forceMount?: boolean;
  }
  
  // Header props
  export interface ModalHeaderCoreProps {
    className?: string;
  }
  
  // Footer props
  export interface ModalFooterCoreProps {
    className?: string;
  }
  
  // Title props
  export interface ModalTitleCoreProps {
    className?: string;
  }
  
  // Description props
  export interface ModalDescriptionCoreProps {
    className?: string;
  }
  
  // Trigger props
  export interface ModalTriggerCoreProps {
    className?: string;
    asChild?: boolean;
  }
  
  // Close props
  export interface ModalCloseCoreProps {
    className?: string;
    asChild?: boolean;
  }