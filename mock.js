/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'mk-utils'

const mockData = fetch.mockData

function initMockData() {
    if (!mockData.persons) {
        mockData.persons = []
        for(let i = 1 ; i < 100; i ++){
            mockData.persons.push({
                id: i,
                name: '张' + i,
            })
        }
    }
}

fetch.mock('/v1/person/findById', (option) => {
    initMockData()
    const company = mockData.persons.find(o => o.id == option.id)
    return {
        result: true,
        value: company
    }
})

fetch.mock('/v1/person/create', (option) => {
    initMockData()

    const id = mockData.persons.length
    const v = { ...option, id }
    mockData.persons.push(v)

    return { result: true, value: v }
})

fetch.mock('/v1/person/update', (option) => {
    initMockData()
    mockData.persons[option.id] = option
    return { result: true, value: option }
})

