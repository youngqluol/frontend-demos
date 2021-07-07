import * as types from '@/store/types';

const state = {
    rankArry: []
    // tourArry: [],
    // lifeArry: []
};

const mutations = {
    [types.getRankArry](state, type = '') {
        switch (type) {
            case 'tour':
                state.rankArry = [
                    { ranking: 1, score: 100, name: '旅游' },
                    { ranking: 2, score: 95, name: '旅游' }
                ];
                break;
            case 'life':
                state.rankArry = [
                    { ranking: 1, score: 100, name: '生活' },
                    { ranking: 2, score: 95, name: '生活' }
                ];
                break;
            case 'all':
                state.rankArry = [
                    { ranking: 1, score: 100, name: '全部' },
                    { ranking: 2, score: 95, name: '全部' }
                ];
                break;
        }
    }
};

export default {
    state,
    mutations
};
