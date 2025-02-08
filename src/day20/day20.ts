export const exampleFunction = (line: string): number | undefined => {
    return Number(line);
}

export interface FirewallRule {
    min: number;
    max: number;
}

export namespace FirewallRule {
    export const from = (data: string[]): FirewallRule[] => {
        return data.map(it => ({
            min: Number(it.substringBefore("-")),
            max: Number(it.substringAfter("-"))
        }));
    }
}

export const getMin = (rules: FirewallRule[]) => {

    let ip = 0;
    while (rules.find(it => ip.between(it.min, it.max)) != undefined) {
        ip++;
    }
    return ip;
}

export const merge = (rules: FirewallRule[]): FirewallRule[] => {
    var pos = 0;
    rules = rules.sort((a, b) => a.min - b.min);

    while (pos < rules.length) {
        const rule = rules[pos];

        let overlaps = rules
            .filter(it => it != rule)
            .filter(it =>
                it.min.between(rule.min, rule.max) ||
                it.max.between(rule.min, rule.max) ||
                (it.min >= rule.min && it.max <= rule.max) ||
                (rule.min >= it.min && rule.max <= it.max)
            )
        overlaps.forEach((overlap) => {
            rule.max = Math.max(rule.max, overlap.max)
            rule.min = Math.min(rule.min, overlap.min)
        })
        rules = rules.filter(it => !overlaps.includes(it))
        pos++
    }
    rules = rules.sort((a, b) => a.min - b.min);

    pos = 0;

    while (pos < rules.length-1) {
        const rule = rules[pos];
        const nextRule = rules[pos + 1];

        if (rule.max + 1 == nextRule.min) {
            rule.max = nextRule.max;
            rules = rules.filter(it => it != nextRule);
        } else {
            pos++
        }
    }
    rules = rules.sort((a, b) => a.min - b.min);

    return rules
}

export const generateGaps = (max: number, rules: FirewallRule[]): number => {
    let count = 0;
    for (let i = 0; i < rules.length - 1; i++) {
        const diff = (rules[i + 1].min - rules[i].max) - 1;
        count += diff
    }
    return count
}
