import { PhoneNumberUtil } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

export const validatePhoneNumber = (phoneNumber) => {
  try {
    // Parse the phone number
    const parsedNumber = phoneUtil.parse(phoneNumber);
    // Check if the parsed number is valid
    const isValid = phoneUtil.isValidNumber(parsedNumber);
    return isValid;
  } catch (e) {
    // Handle any parsing errors
    return false;
  }
}