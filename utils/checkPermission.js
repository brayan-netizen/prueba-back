const checkPermission = (user, requiredPermission) => {
	if (!user) throw new Error('Not authenticated');

	const userPermissions =
		user.roles?.flatMap((role) => role.permissions) || [];

	if (
		!userPermissions.includes('all') &&
		!userPermissions.includes(requiredPermission)
	) {
		throw new Error('You do not have permission to perform this action');
	}
};

module.exports = checkPermission;
