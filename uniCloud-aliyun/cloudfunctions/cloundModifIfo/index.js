'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	let {img ,name} = event
 	return await db.collection('user').doc("648039e4f5cf3a3d28e0e69b").update({
		img,
		name
	})
};
