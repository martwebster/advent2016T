import {Position} from "../utility/position";

export interface FileNode {
    pos: Pos;
    size: number;
    used: number;
    avail: number;
    use: number;
}

export namespace FileNode {
    export const from = (data: string[]): FileNode[] => {
        return data.map(it => it.split(" ").filter(it => it.length > 0))
            .map(row => ({
                pos: {
                    x: Number(row[0].substringBetween("x", "-y")),
                    y: Number(row[0].substringAfter("y"))
                },
                size: Number(row[1].substringBefore("T")),
                used: Number(row[2].substringBefore("T")),
                avail: Number(row[3].substringBefore("T")),
                use: Number(row[4].substringBefore("%")),
            } as FileNode))
    }
}

const countNodePairs = (node: FileNode, nodes: FileNode[]) => {
    return nodes.countOf(it => {
            if (Position.toString(it.pos) == Position.toString(node.pos)) {
                return false
            }
            if (node.used == 0) {
                return false
            }
            return it.avail >= node.used;
        }
    )
};
export const getViablePairs = (nodes: FileNode[]): number => {
    return nodes.sumOf(it => countNodePairs(it, nodes))
}

export const displayFixed = (dig: number, size: number): string => {
    if (dig > 100) {
        return "###"
    }
    return ("0".repeat(size - 1) + dig).slice(-size)
}

export const displayNodes = (nodes: FileNode[]) => {
    const maxY = nodes.maxOf(it => it.pos.y);
    for (let y = 0; y <= maxY; y++) {
        const xNodes = nodes.filter(it => it.pos.y == y).sort((a, b) => a.pos.x - b.pos.x);
        console.log(xNodes.map(it => displayFixed(it.used, 3) + "/" + displayFixed(it.size, 3)).join(" "))
    }
}
