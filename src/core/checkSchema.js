"use strict";
import DEFINE_TYPE from "./defineProperty/DEFINE_TYPE";

let checkSchema = function () {

}
let testData = [
    {
        keyName: 'block',
        type: DEFINE_TYPE.UINT,
        description: '블록 식별자'
    },
    {
        keyName: 'blockInfo',
        type: 'array',
        description: '블럭구성 정보',
        subCheckList: [
            {
                keyName: 'block',
                type: DEFINE_TYPE.STRING,
                description: '블록 식별자',
                defaultValueList: ['A', 'B', 'C', 'D']
            },
            {
                keyName: 'datSampleSn',
                type: DEFINE_TYPE.UINT,
                description: '순번'
            },
            {
                keyName: 'pacmanSn',
                type: DEFINE_TYPE.UINT,
                description: '팩맨순번'
            },
            {
                keyName: 'leftDirectionYn',
                type: DEFINE_TYPE.BOOLEAN,
                defaultValueList: [true, false]
            }
        ]
    },
    {
        keyName: 'datSampleSn',
        type: DEFINE_TYPE.UINT,
        description: '샘플 순번'
    },
    {
        keyName: 'itemList',
        type: 'array',
        description: '아이템 출동정보!',
        subCheckList: [
            {
                keyName: 'datSampleSn',
                type: DEFINE_TYPE.UINT,
                description: '순번'
            },
            {
                keyName: 'duration',
                type: 'number',
                description: '지속시간'
            },
            {
                keyName: 'left',
                type: DEFINE_TYPE.UINT,
                description: '왼쪽 위치',
                defaultValueList: [1, 2, 3, 4, 5, 6, 7, 8]
            },
            {
                keyName: 'right',
                type: DEFINE_TYPE.UINT,
                description: '오른쪽위치',
                defaultValueList: [1, 2, 3, 4, 5, 6, 7, 8]
            },
            {
                keyName: 'trialSn',
                type: DEFINE_TYPE.UINT,
                description: '시도 순번'
            }
        ]
    },
    {
        keyName: 'limitTime',
        type: DEFINE_TYPE.UINT,
        description: '<div style="color:red">사용하지않음</div>',
        nullAble: true
    },
    {
        keyName: 'partNumber',
        type: DEFINE_TYPE.UINT,
        description: '파트 식별자'
    },
    {
        keyName: 'questionSn',
        type: DEFINE_TYPE.UINT,
        description: '순번'
    },
    {
        keyName: 'speedInfo',
        type: 'object',
        description: '스피드정보 -_-?',
        subCheckList: [
            {
                keyName: 'left',
                type: 'array',
                description: '왼쪽 라인별 스피드정보'
            },
            {
                keyName: 'right',
                type: 'array',
                description: '오른쪽 라인별 스피드정보'
            }
        ]
    }
]