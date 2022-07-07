import { useEffect, useState } from "react";
import { Sankey } from "react-vis";
import { CogIcon } from "@heroicons/react/solid";


export default function SankeyComponent({ data }) {
  const [isData, setIsData] = useState(false);
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [hovered, setHovered] = useState(false);
  const [hoveredLabel, setHoveredLabel] = useState(false);

  useEffect(() => {
    if (data['nodes']) {
      const dataNodes = data['nodes'].map((ele) => {
        ele['color'] = "#e11d48";
        return ele;
      })
      const dataLinks = data['links'].map((ele) => {
        ele['color'] = "#94a3b8";
        ele['opacity'] = 0.5;
        return ele;
      });

      setNodes(dataNodes);
      setLinks(dataLinks);
      setIsData(true);
    }
  }, [data]);

  const style = {
    labels: {
      className: "text-sm fill-sky-300"
    }
  }

  function handleMouseOver(d) {
    setHovered(d);
    if (d['name']) setHoveredLabel(`"${d.name}"`);
    else setHoveredLabel(`"${d.source.name}" -> "${d.target.name}"`);
  }

  if (!isData) {
    return (
      <div className="flex justify-center items-center">
        <CogIcon className="animate-spin h-16 w-16" />
      </div>
    );
  }

  return (
    <div className="border border-zinc-600 pt-4 my-2">
      <div className="flex justify-center">
        <p>
          {hovered ? `Number of ${hoveredLabel}: ` : <span className="text-amber-400 font-bold">Hover To Select</span>}
          <span className="text-amber-400">{`${hovered ? hovered.value : ''}`}</span>
        </p>
      </div>
      <Sankey
        nodes={nodes}
        links={links}
        align="center"
        width={798}
        height={200}
        style={style}
        nodePadding={30}
        nodeWidth={10}
        onValueMouseOver={(d, e) => handleMouseOver(d)}
        onValueMouseOut={d => setHovered(false)}
        onLinkMouseOver={(d, e) => handleMouseOver(d)}
        onLinkMouseOut={d => setHovered(false)}
      />
    </div>
  );
};