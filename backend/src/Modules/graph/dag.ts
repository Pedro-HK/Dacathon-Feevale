export type DagNode<T = string> = {
  id: T;
  dependencies: T[];
};

export type DagResult<T = string> = {
  order: T[];
  hasCycle: boolean;
  cycle?: T[];
};

export function topologicalSort<T>(nodes: DagNode<T>[]): DagResult<T> {
  const incoming = new Map<T, number>();
  const adjacency = new Map<T, T[]>();

  for (const node of nodes) {
    if (!incoming.has(node.id)) {
      incoming.set(node.id, 0);
    }
    for (const dep of node.dependencies) {
      if (!incoming.has(dep)) {
        incoming.set(dep, 0);
      }
      adjacency.set(dep, [...(adjacency.get(dep) ?? []), node.id]);
      incoming.set(node.id, (incoming.get(node.id) ?? 0) + 1);
    }
  }

  const queue: T[] = [];
  for (const [id, count] of incoming.entries()) {
    if (count === 0) queue.push(id);
  }

  const order: T[] = [];

  while (queue.length) {
    const id = queue.shift()!;
    order.push(id);
    for (const neighbor of adjacency.get(id) ?? []) {
      incoming.set(neighbor, incoming.get(neighbor)! - 1);
      if (incoming.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  const hasCycle = order.length !== incoming.size;
  if (hasCycle) {
    const cycle = [...incoming.entries()].filter(([, c]) => c > 0).map(([id]) => id);
    return { order, hasCycle: true, cycle };
  }

  return { order, hasCycle: false };
}

export function detectCycle<T>(nodes: DagNode<T>[]): boolean {
  return topologicalSort(nodes).hasCycle;
}

export function getAvailableDisciplines(completedIds: string[], graph: DagNode<string>[]): string[] {
  const completedSet = new Set(completedIds);
  return graph
    .filter((node) => !completedSet.has(node.id))
    .filter((node) => node.dependencies.every((dep) => completedSet.has(dep)))
    .map((node) => node.id);
}

export function getCriticalPath(graph: DagNode<string>[]): string[] {
  const topo = topologicalSort(graph);
  if (topo.hasCycle) {
    throw new Error('Graph has cycle');
  }

  const dist = new Map<string, number>();
  const prev = new Map<string, string | null>();

  for (const id of topo.order) {
    dist.set(id, 0);
    prev.set(id, null);
  }

  for (const id of topo.order) {
    const currentDist = dist.get(id) ?? 0;
    for (const neighbor of graph.filter((n) => n.dependencies.includes(id)).map((n) => n.id)) {
      const candidate = currentDist + 1;
      if (candidate > (dist.get(neighbor) ?? 0)) {
        dist.set(neighbor, candidate);
        prev.set(neighbor, id);
      }
    }
  }

  let last: string | null = null;
  let max = -1;
  for (const [id, d] of dist.entries()) {
    if (d > max) {
      max = d;
      last = id;
    }
  }

  if (!last) {
    return [];
  }

  const path: string[] = [];
  while (last !== null) {
    path.unshift(last);
    last = prev.get(last) ?? null;
  }

  return path;
}

export function getProgressPercentage(completedIds: string[], totalDisciplines: number): number {
  if (totalDisciplines <= 0) return 0;
  const completedSet = new Set(completedIds);
  return (completedSet.size / totalDisciplines) * 100;
}
