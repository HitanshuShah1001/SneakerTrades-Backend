function GenerateOTP() {
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += Math.floor(Math.random() * 10);
  }
  return OTP;
}
module.exports = GenerateOTP;
