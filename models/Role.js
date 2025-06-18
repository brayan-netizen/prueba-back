const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	permissions: [String] // Ej: ['read:users', 'delete:users']
});

module.exports = mongoose.model('Role', roleSchema);
