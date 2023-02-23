export function useErrorHandler() {

  function getError(type) {
    let funcWithDefault;
    const errors = {
      "auth/invalid-email": () => "please, check your email or password",
      "auth/email-already-in-use": () => "this account already exists",
      "auth/internal-error": () => "Enter correct password",
      "auth/user-not-found": () => "No created account was found",
      "auth/wrong-password": () => "Enter correct password",
      default: () => "Email or password are incorrect",
    };
    if (errors[type]) {
        funcWithDefault = errors[type];
    } else {
        funcWithDefault = errors["default"];
    }
    return funcWithDefault();
  }

  return { getError };
}
