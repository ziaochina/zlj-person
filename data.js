export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'simple-modal-card zlj-person',
		children: [{
			component: '##form',
			className: 'simple-modal-card-form zlj-person-form',
			items: [
			{ type: 'number', title: '手机号', required: true, bindPath: 'data.form.mobile' },
			{ type: 'input', title: '邮箱', bindPath: 'data.form.email' },
			{ type: 'input', title: '姓名', required: true, bindPath: 'data.form.name' },
			{ type: 'input', title: '身份证', bindPath: 'data.form.idCardNo' },
			{ type: 'input', title: '所属公司', bindPath: 'data.form.company' },
			{ type: 'input', title: '职位', bindPath: 'data.form.job' },
			{ type: 'input', title: '所属部门', bindPath: 'data.form.department' },
			{ type: 'select', title: '婚姻状况', bindPath: 'data.form.maritalStatus', showArrow:true, dsPath: 'data.other.maritalStatuss', valueIsObj: false },
			{ type: 'input', title: '学历', bindPath: 'data.form.education' },
			{ type: 'input', title: '专业', bindPath: 'data.form.major' },
			]
		},{
			name: 'function',
			component: 'Layout',
			className: 'zlj-person-function',
			children:[
				{ component: '##button', title: '保存',  type: 'bluesky', onClick: 'save' },
			]
		}]
	}
}


export function getInitState(option) {
	var state = {
		data: {
			form: {
			},
			other: {
				maritalStatuss: [{
					id: 1,
					name: '已婚'
				}, {
					id: 2,
					name: '未婚'
				}],
				error: {}
			}
		}
	}

	return state
}