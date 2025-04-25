export const MODAL_TYPES = ["confirm", "warning", "error", "success"] as const;

export type ModalType = (typeof MODAL_TYPES)[number];

export const MODAL_STYLES: Record<ModalType, string> = {
  confirm: "bg-blue-100 border-blue-500",
  warning: "bg-yellow-100 border-yellow-500",
  error: "bg-red-100 border-red-500",
  success: "bg-green-100 border-green-500",
};
