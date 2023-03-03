export function useErrorHandler() {

  function getError(type) {
    let defaultError;
    const errors = {
      "auth/invalid-email": "please, check your email or password",
      "auth/email-already-in-use": "this account already exists",
      "auth/internal-error": "Enter correct password",
      "auth/user-not-found": "No created account was found",
      "auth/wrong-password": "Enter correct password",
      "wrong-confirm": "wrong password confirmation: check entered passwords ",      
    };
    if (errors[type]) {
      defaultError = errors[type];
    } else {
      defaultError = errors["wrong-confirm"];
    }
    return defaultError;
  }

  return { getError };
}
