import webapi from './webapi'

var _options = {
	webapi,
	webapiMap: {
		'person.findById':'/v1/person/findById',
		'person.create': '/v1/person/create',
		'person.update': '/v1/person/update',
	}
}

function config(options) {
	if (options) {
		Object.assign(_options, options)
	}
}

config.current = _options

export default config