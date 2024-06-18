const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String },
  passwordHash: { type: String, required: true },
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.toJSONFull = function() {
  const userObject = this.toObject();
  userObject.id = userObject._id.toString();
  return userObject;
}

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
  returnedObject.id = returnedObject._id.toString()
  delete returnedObject._id
  delete returnedObject.__v
  delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema);

module.exports = User;
