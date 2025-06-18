const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: String,
	lastName: String,
	username: { type: String, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	createDate: { type: Date, default: Date.now },
	roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }]
});

module.exports = mongoose.model('User', userSchema);
