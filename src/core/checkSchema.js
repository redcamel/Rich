"use strict";
let checkSchema = function () {

}
let testData = [
    {
        key: 'block',
        type: 'uint',
        description: '블록 식별자'
    },
    {
        key: 'blockInfo',
        type: 'array',
        description: '블럭구성 정보',
        subCheckList: [
            {
                key: 'block',
                type: 'string',
                description: '블록 식별자',
                defaultValueList: ['A', 'B', 'C', 'D']
            },
            {
                key: 'datSampleSn',
                type: 'uint',
                description: '순번'
            },
            {
                key: 'pacmanSn',
                type: 'uint',
                description: '팩맨순번'
            },
            {
                key: 'leftDirectionYn',
                type: 'boolean',
                defaultValueList: [true, false]
            }
        ]
    },
    {
        key: 'datSampleSn',
        type: 'uint',
        description: '샘플 순번'
    },
    {
        key: 'itemList',
        type: 'array',
        description: '아이템 출동정보!',
        subCheckList: [
            {
                key: 'datSampleSn',
                type: 'uint',
                description: '순번'
            },
            {
                key: 'duration',
                type: 'number',
                description: '지속시간'
            },
            {
                key: 'left',
                type: 'uint',
                description: '왼쪽 위치',
                defaultValueList: [1, 2, 3, 4, 5, 6, 7, 8]
            },
            {
                key: 'right',
                type: 'uint',
                description: '오른쪽위치',
                defaultValueList: [1, 2, 3, 4, 5, 6, 7, 8]
            },
            {
                key: 'trialSn',
                type: 'uint',
                description: '시도 순번'
            }
        ]
    },
    {
        key: 'limitTime',
        type: 'uint',
        description: '<div style="color:red">사용하지않음</div>',
        nullAble: true
    },
    {
        key: 'partNumber',
        type: 'uint',
        description: '파트 식별자'
    },
    {
        key: 'questionSn',
        type: 'uint',
        description: '순번'
    },
    {
        key: 'speedInfo',
        type: 'object',
        description: '스피드정보 -_-?',
        subCheckList: [
            {
                key: 'left',
                type: 'array',
                description: '왼쪽 라인별 스피드정보'
            },
            {
                key: 'right',
                type: 'array',
                description: '오른쪽 라인별 스피드정보'
            }
        ]
    }
]