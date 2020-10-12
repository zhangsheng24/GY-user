export default {
    renovation: {
        // 获取阶段（通过流程字典类型编号）。
        getPhaseDataByTypeDictId: {
            method: 'get',
            url: '/u/procedure/get-phase-data-by-type-dict-id'
        },
        // 二阶断
        getSubPhaseDataByPhaseId: {
            method: 'get',
            url: '/u/procedure/get-sub-phase-data-by-phase-id'
        },
        // 步骤
        getSubPhaseAndStepDataBySubPhaseId: {
            method: 'get',
            url: '/u/procedure/get-sub-phase-And-step-data-by-sub-phase-id'
        },
        // 完成步骤
        save: {
            method: 'post',
            url: '/u/my-procedure/save'
        }
    }
}