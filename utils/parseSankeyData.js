export default function parseSankeyData(data) {
  let max_stage = 0;
  for (let i = 0; i < data.length; i++) {
    const stage = data[i]['stage'];
    if (max_stage < stage) max_stage = stage;
  }

  const nodes = [];
  const stages = {};
  for (let i = 0; i <= max_stage; i++) {
    const node = {
      name: i
    };
    nodes.push(node);
    const source = i;
    stages[source] = {};
  }
  nodes.push({ name: 'Rejection' });
  nodes.push({ name: 'Offer' });

  for (let i = 0; i < data.length; i++) {
    const final_stage = data[i]['stage'];
    const end_target = data[i]['company_response'];
    for (let j = 0; j <= final_stage; j++) {
      if (j === final_stage) {
        if (!stages[j][end_target]) stages[j][end_target] = 1;
        else stages[j][end_target]++;
      } else {
        if (!stages[j][j+1]) stages[j][j+1] = 1;
        else stages[j][j+1]++;
      }
    }
  }
  
  const links = [];
  for (let i = 0; i <= max_stage; i++) {
    const source = i === 0 ? 'Job Applications' : `Interview #${i}s`;
    const keys = Object.keys(stages[i]);
    for (let j = 0; j < keys.length; j++) {
      const link = {
        source: source,
        target: keys[j],
        value: stages[i][keys[j]]
      }
      links.push(link);
    }
  }
  
  return { nodes: nodes, links: links };
}