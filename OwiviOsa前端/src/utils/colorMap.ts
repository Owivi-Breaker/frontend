const percentColorsForProgress = [
    {
        pct: 0,
        color: { r: 0xff, g: 0x00, b: 0 }
    },
    {
        pct: 50,
        color: { r: 0xff, g: 0xff, b: 0 }
    },
    {
        pct: 100,
        color: { r: 0x00, g: 0x80, b: 0 }
    }
];

const percentColorsForText = [
    {
        pct: 0,
        color: { r: 0xff, g: 0x00, b: 0 }
    },
    {
        pct: 50,
        color: { r: 0xea, g: 0xcd, b: 0x76 }
    },
    {
        pct: 100,
        color: { r: 0x05, g: 0x77, b: 0x48 }
    }
];

export const getColor = function (pct: number, type: string = 'progress', begin: number = 0, end: number = 100) {
    let percentColors = []
    if (type == 'progress') {
        percentColors = percentColorsForProgress
    } else {
        percentColors = percentColorsForText
    }
    percentColorsForProgress[0].pct = begin;
    percentColorsForProgress[1].pct = (begin + end) / 2;
    percentColorsForProgress[2].pct = end;
    percentColorsForText[0].pct = begin;
    percentColorsForText[1].pct = (begin + end) / 2;
    percentColorsForText[2].pct = end;
    let i = 1
    for (; i < percentColors.length - 1; i++) {
        if (pct < percentColors[i].pct) {
            break;
        }
    }
    let lower = percentColors[i - 1];
    let upper = percentColors[i];
    let range = upper.pct - lower.pct;
    let rangePct = (pct - lower.pct) / range;
    let pctLower = 1 - rangePct;
    let pctUpper = rangePct;
    let color = {
        r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
        g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
        b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
};