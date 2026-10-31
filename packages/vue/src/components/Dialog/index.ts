export { default as Dialog } from "./Dialog.vue";
export { default as DialogContent } from "./DialogContent.vue";
export { default as DialogHeader } from "./DialogHeader.vue";
export { default as DialogTitle } from "./DialogTitle.vue";
export { default as DialogDescription } from "./DialogDescription.vue";
export { default as DialogBody } from "./DialogBody.vue";
export { default as DialogFooter } from "./DialogFooter.vue";
export { default as DialogCloseButton } from "./DialogCloseButton.vue";
export { useDialogContext } from "./context";
export type { DialogContextValue } from "./context";
export type {
  DialogProps,
  DialogCoreProps,
  DialogSize,
  DialogRole,
  DialogHeaderProps,
  DialogBodyProps,
  DialogFooterProps,
  FocusTarget,
} from "../../types/dialog";
