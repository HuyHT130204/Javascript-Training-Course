exports.buildGraph = function buildGraph(edges) {
    let graph = Object.create(null);
    
    function addEdge(from, to) {
      if (from in graph) {
        graph[from].push(to);
      } else {
        graph[from] = [to];
      }
    }
    
    for (let [from, to] of edges) {
      addEdge(from, to);
      addEdge(to, from);  // Roads are bidirectional
    }
    
    return graph;
};
