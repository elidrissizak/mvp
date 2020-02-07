interface TreemapActionColors {
    inactive: {
        neutral: { background: string, text: string },
        highlighted: { background: string, text: string },
        selected: { background: string, text: string }
    },
    active: {
        neutral: { background: string, text: string },
        highlighted: { background: string, text: string },
        selected: { background: string, text: string }
    }
}

interface CoreConstants {
    TREEMAP_COLORS: {
        withSuppliers: TreemapActionColors,
        withoutSuppliers: TreemapActionColors
    },
}

export let CORE_CONSTANTS: CoreConstants = {
    TREEMAP_COLORS: {
        withSuppliers: {
            inactive: {
                neutral: { background: '#d8d8d8', text: '#2b343d' },
                highlighted: { background: '#b2b2b2', text: '#2b343d' },
                selected: { background: '#7c7a7a', text: '#ffffff' }
            },
            active: {
                neutral: { background: '#dfe9f4', text: '#2b343d' },
                highlighted: { background: '#91c1f5', text: '#2b343d' },
                selected: { background: '#4a90e2', text: '#ffffff' }
            }
        },
        withoutSuppliers: {
            inactive: {
                neutral: { background: '#d8d8d8', text: '#2b343d' },
                highlighted: { background: '#b2b2b2', text: '#2b343d' },
                selected: { background: '#7c7a7a', text: '#ffffff' }
            },
            active: {
                neutral: { background: '#fbd2d4', text: '#2b343d' },
                highlighted: { background: '#ebabad', text: '#2b343d' },
                selected: { background: '#d0565a', text: '#ffffff' }
            }
        }
    },
};
