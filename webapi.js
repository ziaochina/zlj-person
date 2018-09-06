import { fetch } from 'mk-utils'
import config from './config'

const api = key => config.current.webapiMap[key]

export default {
    person: {
        findById: (id) => fetch.post(api('person.findById'), { id }),
        create: (option) => fetch.post(api('person.create'), option),
        update: (option) => fetch.post(api('person.update'), option),
    },
}