const Role = require('../../models/Role');
const permission = require('../../utils/permission');
const checkPermission = require('../../utils/checkPermission');

const roles = async (_, __, { user }) => {
	checkPermission(user, permission.readRoles);
	return await Role.find();
};

const role = async (_, { id }, { user }) => {
	checkPermission(user, permission.readRole);
	return await Role.findById(id);
};

const createRole = async (_, { name, permissions }, { user }) => {
	checkPermission(user, permission.createRole);

	const existing = await Role.findOne({ name });
	if (existing) throw new Error('Role already exists');

	// Eliminar el permiso "all" si está presente
	const cleanPermissions = permissions.filter((p) => p !== 'all');

	const role = new Role({ name, permissions: cleanPermissions });
	await role.save();

	return role;
};

const updateRole = async (_, { id, name, permissions }, { user }) => {
	checkPermission(user, permission.updateRole);

	const updateData = {};

	if (name) updateData.name = name;
	if (permissions) {
		updateData.permissions = permissions.filter((p) => p !== 'all');
	}

	return await Role.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteRole = async (_, { id }, { user }) => {
	checkPermission(user, permission.deleteRole);
	await Role.findByIdAndDelete(id);
	return true;
};
module.exports = { roles, role, createRole, updateRole, deleteRole };
