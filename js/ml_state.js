const ML_LOGIC = {
    user: null,
    role: null,
    currentTab: 'tab-garapan',
    staticData: null,
    cache: { shows: {}, fansubs: {} },
    
    tempLockedFansubs: [],
    currentEpisodeLinks: [],
    episodeTabState: {},
    editingEpisodeId: null,
    editingSuffix: null,
    editingFansubId: null,
    editingShowId: null,
    memberData: {},
    
    sortOrder: 'asc',
    sortColumn: 'id'
};