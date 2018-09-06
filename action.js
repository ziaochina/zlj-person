import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'
import extend from './extend'
import utils from 'mk-utils'
import { fromJS } from 'immutable'
class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.extendAction = option.extendAction
        this.config = config.current
        this.webapi = this.config.webapi
    }

    onInit = ({ component, injections }) => {
        this.extendAction.formAction.onInit({ component, injections })
        this.component = component
        this.injections = injections
        if (this.component.props.setOkListener)
            this.component.props.setOkListener(this.onOk)
        injections.reduce('init')
        this.load()
    }

    load = async () => {
        if (this.component.props.personId || this.component.props.personId == 0) {
            var response = await this.webapi.person.findById(this.component.props.personId)
            this.injections.reduce('load', response)
        }
    }

    onOk = async () => {
        return await this.save()
    }

    save = (data) => async () => {
        const form = data.form
        const msg = this.checkSave(form)

        if (msg.length > 0) {
            this.metaAction.toast('error', utils.ui.toToastContent(msg))
            return false
        }

        var isModify = (form.id || form.id == 0)
        const response = isModify ?
            await this.webapi.person.update(form) :
            await this.webapi.person.create(form)

        this.metaAction.toast('success', isModify ? '修改人员成功' : '新增人员成功')
        this.injections.reduce('load', response)
        this.component.props.modalCancel && this.component.props.modalCancel ()
        return response
    }

    checkSave = (form) => {
        var msg = []
        !form.mobile && msg.push('手机不能为空!');
        !form.name && msg.push('姓名不能为空!');
        return msg
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        extendAction = extend.actionCreator({ ...option, metaAction }),
        o = new action({ ...option, metaAction, extendAction }),
        ret = { ...metaAction, ...extendAction.formAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}