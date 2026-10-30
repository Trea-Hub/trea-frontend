export type CheckoutFailureCode =
  | "wallet_rejected"
  | "wrong_network"
  | "insufficient_balance"
  | "rpc_error"
  | "unknown";

export type CheckoutFailure = {
  code: CheckoutFailureCode;
  message: string;
};

export type CheckoutState =
  | { status: "idle" }
  | { status: "pending"; phase: "signing" | "verifying" }
  | { status: "confirmed"; transactionHash?: string }
  | { status: "failed"; error: CheckoutFailure };

export type CheckoutEvent =
  | { type: "SUBMIT" }
  | { type: "SIGNATURE_APPROVED" }
  | { type: "CONFIRMED"; transactionHash?: string }
  | { type: "FAILED"; error: CheckoutFailure }
  | { type: "RETRY" }
  | { type: "RESET" };

export const checkoutFailureMessages: Record<CheckoutFailureCode, string> = {
  wallet_rejected:
    "The signature request was rejected in your wallet. No funds were moved.",
  wrong_network:
    "Your wallet is on the wrong Stellar network. Switch to the network Trea uses and try again.",
  insufficient_balance:
    "Your wallet does not have enough funds for this ticket plus network fees.",
  rpc_error:
    "We could not reach the Stellar network. Check your connection and try again.",
  unknown:
    "The transaction could not be completed. No funds were moved.",
};

export function createCheckoutFailure(code: CheckoutFailureCode): CheckoutFailure {
  return { code, message: checkoutFailureMessages[code] };
}

export const initialCheckoutState: CheckoutState = { status: "idle" };

export function checkoutReducer(
  state: CheckoutState,
  event: CheckoutEvent,
): CheckoutState {
  switch (event.type) {
    case "SUBMIT":
      return state.status === "idle" || state.status === "failed"
        ? { status: "pending", phase: "signing" }
        : state;
    case "SIGNATURE_APPROVED":
      return state.status === "pending" && state.phase === "signing"
        ? { status: "pending", phase: "verifying" }
        : state;
    case "CONFIRMED":
      return state.status === "pending" && state.phase === "verifying"
        ? { status: "confirmed", transactionHash: event.transactionHash }
        : state;
    case "FAILED":
      return state.status === "pending"
        ? { status: "failed", error: event.error }
        : state;
    case "RETRY":
      return state.status === "failed" ? { status: "idle" } : state;
    case "RESET":
      return initialCheckoutState;
  }
}

export function isCheckoutBusy(state: CheckoutState) {
  return state.status === "pending" || state.status === "confirmed";
}

export function canSubmitCheckout(state: CheckoutState) {
  return state.status === "idle" || state.status === "failed";
}

export type CheckoutTone = "idle" | "pending" | "confirmed" | "failed";

export type CheckoutView = {
  tone: CheckoutTone;
  statusLabel: string;
  secondaryStatus: string;
  buttonLabel: string;
  buttonIcon: string;
  pipelineIcon: string;
  disabled: boolean;
  showError: boolean;
  errorMessage?: string;
};

export function getCheckoutView(state: CheckoutState): CheckoutView {
  switch (state.status) {
    case "idle":
      return {
        tone: "idle",
        statusLabel: "Ready to Sign",
        secondaryStatus: "Atomic",
        buttonLabel: "Confirm & Sign Transaction",
        buttonIcon: "lock",
        pipelineIcon: "lock_clock",
        disabled: false,
        showError: false,
      };
    case "pending":
      return state.phase === "signing"
        ? {
            tone: "pending",
            statusLabel: "Signing",
            secondaryStatus: "Awaiting Signature",
            buttonLabel: "Opening Freighter Wallet...",
            buttonIcon: "lock_clock",
            pipelineIcon: "lock_clock",
            disabled: true,
            showError: false,
          }
        : {
            tone: "pending",
            statusLabel: "Verifying Proof",
            secondaryStatus: "Securing",
            buttonLabel: "Verifying Soroban Proof...",
            buttonIcon: "lock_clock",
            pipelineIcon: "lock_clock",
            disabled: true,
            showError: false,
          };
    case "confirmed":
      return {
        tone: "confirmed",
        statusLabel: "Confirmed",
        secondaryStatus: "Finalized",
        buttonLabel: "Confirmed! Ticket Minted",
        buttonIcon: "check_circle",
        pipelineIcon: "check_circle",
        disabled: true,
        showError: false,
      };
    case "failed":
      return {
        tone: "failed",
        statusLabel: "Failed",
        secondaryStatus: "Reverted",
        buttonLabel: "Retry Transaction",
        buttonIcon: "refresh",
        pipelineIcon: "error",
        disabled: false,
        showError: true,
        errorMessage: state.error.message,
      };
  }
}
