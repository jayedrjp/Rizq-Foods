export function firebaseAuthErrorMessage(error: unknown): string {
  const code = (error as { code?: string })?.code ?? "";

  switch (code) {
    case "auth/invalid-email":
      return "That email address looks invalid.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password.";
    case "auth/email-already-in-use":
      return "An account with this email already exists. Try signing in instead.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return "Sign-in was cancelled.";
    case "auth/popup-blocked":
      return "Your browser blocked the sign-in popup. Please allow popups and try again.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again.";
    default:
      return "Something went wrong. Please try again.";
  }
}

export function firestoreOrderErrorMessage(error: unknown): string {
  const code = (error as { code?: string })?.code ?? "";

  switch (code) {
    case "permission-denied":
      return "Firestore denied this order. Enable Firestore and publish the orders security rule in Firebase Console.";
    case "unavailable":
      return "Firestore is temporarily unavailable. Check your connection and try again.";
    case "failed-precondition":
      return "Firestore is not configured for this project yet. Enable Cloud Firestore in Firebase Console.";
    case "invalid-argument":
      return "Some order details are invalid. Please review the form and try again.";
    default:
      return "We couldn't place your order. Please try again.";
  }
}
